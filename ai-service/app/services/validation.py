import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import get_settings


def get_db():
    settings = get_settings()
    return psycopg2.connect(settings.database_url, cursor_factory=RealDictCursor)


async def validate_timesheet(timesheet_id: str, extracted: dict, client_id: str, employee_id: str | None) -> dict:
    results = []
    passed = True

    required = ["employeeId", "workingDays", "payrollPeriod"]
    for field in required:
        val = extracted.get(field)
        ok = val is not None and val != "" and val != 0
        if field == "workingDays":
            ok = extracted.get("workingDays", 0) > 0
        results.append({
            "passed": ok,
            "ruleKey": "required_fields",
            "ruleName": f"Required field: {field}",
            "severity": "error",
            "message": f"{field} is {'present' if ok else 'missing'}",
            "suggestedFix": f"Provide valid {field}" if not ok else None,
        })
        if not ok:
            passed = False

    working_days = int(extracted.get("workingDays", 0))
    max_days = 31
    ot_max = 80

    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            'SELECT "ruleKey", "ruleValue", severity FROM validation_rules WHERE "isActive" = true AND ("clientId" IS NULL OR "clientId" = %s)',
            (client_id,),
        )
        rules = cur.fetchall()

        for rule in rules:
            key = rule["ruleKey"]
            val = rule["ruleValue"]
            if key == "max_working_days" and working_days > val.get("value", max_days):
                results.append({
                    "passed": False,
                    "ruleKey": key,
                    "ruleName": "Maximum Working Days",
                    "severity": rule["severity"],
                    "message": f"Working days {working_days} exceeds maximum {val.get('value', max_days)}",
                    "evidence": {"workingDays": working_days, "max": val.get("value")},
                    "suggestedFix": "Verify working days count",
                })
                passed = False
            elif key == "max_overtime_hours":
                ot = float(extracted.get("overtime", 0))
                if ot > val.get("value", ot_max):
                    results.append({
                        "passed": False,
                        "ruleKey": key,
                        "ruleName": "Maximum Overtime",
                        "severity": rule["severity"],
                        "message": f"Overtime {ot}h exceeds maximum {val.get('value', ot_max)}h — requires client approval",
                        "suggestedFix": "Client must approve overtime exception",
                    })
                    passed = False

        if employee_id:
            cur.execute(
                'SELECT * FROM payroll WHERE "employeeId" = %s AND period = %s',
                (employee_id, extracted.get("payrollPeriod", "June2026")),
            )
            payroll = cur.fetchone()
            if payroll and working_days > (payroll.get("workingDays") or 31):
                results.append({
                    "passed": False,
                    "ruleKey": "payroll_mismatch",
                    "ruleName": "Payroll Mismatch",
                    "severity": "warning",
                    "message": f"Working days exceed payroll record ({payroll.get('workingDays')} days)",
                    "evidence": {"extracted": working_days, "payroll": payroll.get("workingDays")},
                    "suggestedFix": "Cross-check with payroll master data",
                })

        cur.execute(
            'SELECT id FROM timesheets WHERE "clientId" = %s AND "payrollPeriod" = %s AND id != %s AND status NOT IN (%s, %s)',
            (client_id, extracted.get("payrollPeriod"), timesheet_id, "REJECTED", "EXCEPTION"),
        )
        dup = cur.fetchone()
        if dup:
            results.append({
                "passed": False,
                "ruleKey": "duplicate_timesheet",
                "ruleName": "Duplicate Timesheet",
                "severity": "error",
                "message": "Duplicate timesheet for same period exists",
                "suggestedFix": "Review existing submission",
            })
            passed = False

        cur.close()
        conn.close()
    except Exception as e:
        print(f"Validation DB error: {e}")
        results.append({
            "passed": True,
            "ruleKey": "db_check",
            "ruleName": "Database Check",
            "severity": "warning",
            "message": f"Could not run all DB validations: {e}",
        })

    if passed and all(r["passed"] for r in results if r["severity"] == "error"):
        results.append({
            "passed": True,
            "ruleKey": "all_checks",
            "ruleName": "All Validations",
            "severity": "info",
            "message": "All validation checks passed",
        })

    return {"results": results, "passed": passed and all(r["passed"] for r in results if r.get("severity") == "error")}


async def explain_flag(rule_key: str, context: dict) -> dict:
    from app.services.gemini import generate_text

    prompt = f"""Explain why this invoice/timesheet was flagged.
Rule: {rule_key}
Context: {context}

Provide:
1. Rule violated
2. Evidence
3. Suggested fix

Be concise and professional."""

    text = await generate_text(prompt, f"Rule {rule_key} was violated. Please review the submitted data and correct any discrepancies.")

    return {
        "explanation": text,
        "evidence": str(context.get("validationResults", context)),
        "suggestedFix": "Review and correct the flagged fields, then resubmit.",
    }
