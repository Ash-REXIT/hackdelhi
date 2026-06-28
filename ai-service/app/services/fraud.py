import hashlib
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import get_settings


def get_db():
    settings = get_settings()
    return psycopg2.connect(settings.database_url, cursor_factory=RealDictCursor)


def _normalize_payroll_period(value: str | None) -> str:
    if not value:
        return "June2026"
    compact = value.replace(" ", "")
    if compact.lower() == "june2026":
        return "June2026"
    if "june" in value.lower() and "2026" in value:
        return "June2026"
    return compact


def _parse_total_amount(extracted: dict) -> float:
    val = extracted.get("totalAmount")
    if val:
        return float(val)
    return 0.0


def _lookup_net_pay(cur, emp_id: str, payroll_period: str) -> float | None:
    candidates = list({
        _normalize_payroll_period(payroll_period),
        payroll_period,
        "June2026",
        "June 2026",
    })
    for period in candidates:
        cur.execute(
            'SELECT "netPay" FROM payroll WHERE "employeeId" = %s AND period = %s',
            (emp_id, period),
        )
        payroll = cur.fetchone()
        if payroll and payroll.get("netPay"):
            return float(payroll["netPay"])
    cur.execute(
        'SELECT "netPay" FROM payroll WHERE "employeeId" = %s ORDER BY "createdAt" DESC LIMIT 1',
        (emp_id,),
    )
    fallback = cur.fetchone()
    if fallback and fallback.get("netPay"):
        return float(fallback["netPay"])
    return None


def _risk_level(score: float) -> str:
    if score >= 70:
        return "CRITICAL"
    if score >= 50:
        return "HIGH"
    if score >= 25:
        return "MEDIUM"
    return "LOW"


async def detect_fraud(timesheet_id: str, extracted: dict, file_hash: str | None) -> dict:
    reasons = []
    total_score = 0.0

    overtime = float(extracted.get("overtime", 0))
    working_days = int(extracted.get("workingDays", 0))
    reimbursements = float(extracted.get("reimbursements", 0))
    total_amount = _parse_total_amount(extracted)
    payroll_period = _normalize_payroll_period(extracted.get("payrollPeriod"))

    if overtime > 60:
        score = min(35, overtime - 40)
        reasons.append({
            "checkType": "extreme_overtime",
            "score": score,
            "reason": f"Extreme overtime detected: {overtime} hours",
            "evidence": {"overtime": overtime},
        })
        total_score += score
    elif overtime > 45:
        reasons.append({
            "checkType": "elevated_overtime",
            "score": 18,
            "reason": f"Suspicious overtime band: {overtime} hours",
            "evidence": {"overtime": overtime},
        })
        total_score += 18

    if working_days > 31:
        reasons.append({
            "checkType": "excessive_days",
            "score": 40,
            "reason": f"Impossible day count for June: {working_days} working days",
            "evidence": {"workingDays": working_days},
        })
        total_score += 40
    elif working_days > 28:
        reasons.append({
            "checkType": "excessive_days",
            "score": 22,
            "reason": f"Unusually high working days: {working_days}",
            "evidence": {"workingDays": working_days},
        })
        total_score += 22

    if reimbursements > 10000:
        reasons.append({
            "checkType": "reimbursement_spike",
            "score": 30,
            "reason": f"Unusually large reimbursement claim: AED {reimbursements:.2f}",
            "evidence": {"reimbursements": reimbursements},
        })
        total_score += 30
    elif reimbursements > 5000:
        reasons.append({
            "checkType": "reimbursement_spike",
            "score": 18,
            "reason": f"High reimbursement claim: AED {reimbursements:.2f}",
            "evidence": {"reimbursements": reimbursements},
        })
        total_score += 18

    if total_amount >= 5000 and total_amount % 1000 == 0:
        reasons.append({
            "checkType": "suspicious_round_amount",
            "score": 12,
            "reason": f"Round-number payout request: AED {total_amount:,.0f}",
            "evidence": {"totalAmount": total_amount},
        })
        total_score += 12

    try:
        conn = get_db()
        cur = conn.cursor()

        if file_hash:
            cur.execute(
                'SELECT id, "timesheetId", "fileName" FROM timesheet_documents WHERE "fileHash" = %s AND "timesheetId" != %s',
                (file_hash, timesheet_id),
            )
            dup_doc = cur.fetchone()
            if dup_doc:
                reasons.append({
                    "checkType": "duplicate_document",
                    "score": 45,
                    "reason": "Duplicate document — identical file uploaded previously",
                    "evidence": {
                        "existingTimesheetId": dup_doc["timesheetId"],
                        "fileName": dup_doc.get("fileName"),
                    },
                })
                total_score += 45

        cur.execute(
            'SELECT "clientId", "employeeId" FROM timesheets WHERE id = %s',
            (timesheet_id,),
        )
        ts_row = cur.fetchone()

        if ts_row:
            cur.execute(
                'SELECT COUNT(*) as cnt FROM timesheets WHERE "clientId" = %s AND "createdAt" > NOW() - INTERVAL \'24 hours\'',
                (ts_row["clientId"],),
            )
            recent = cur.fetchone()
            if recent and recent["cnt"] > 5:
                reasons.append({
                    "checkType": "repeated_submissions",
                    "score": 22,
                    "reason": f"High submission frequency: {recent['cnt']} in 24h",
                    "evidence": {"count": recent["cnt"]},
                })
                total_score += 22

            emp_id = ts_row.get("employeeId")
            client_id = ts_row.get("clientId")
            if emp_id and payroll_period:
                cur.execute(
                    """
                    SELECT id, status FROM timesheets
                    WHERE id != %s AND "clientId" = %s AND "employeeId" = %s
                      AND "payrollPeriod" = %s
                      AND status IN (
                        'FRAUD_CHECKED', 'VALIDATED', 'INVOICE_GENERATED',
                        'DISPATCHED', 'PAID', 'PENDING_REVIEW'
                      )
                    LIMIT 1
                    """,
                    (timesheet_id, client_id, emp_id, payroll_period),
                )
                prior = cur.fetchone()
                if prior:
                    reasons.append({
                        "checkType": "duplicate_period",
                        "score": 38,
                        "reason": f"Employee already has a timesheet for {payroll_period}",
                        "evidence": {"existingTimesheetId": prior["id"], "status": prior["status"]},
                    })
                    total_score += 38

            if emp_id and total_amount > 0:
                net_pay = _lookup_net_pay(cur, emp_id, payroll_period)
                if net_pay:
                    diff_pct = abs(total_amount - net_pay) / net_pay if net_pay else 0
                    if diff_pct > 0.5:
                        score = min(40, round(diff_pct * 35))
                        reasons.append({
                            "checkType": "amount_inflation",
                            "score": score,
                            "reason": (
                                f"Claimed AED {total_amount:,.0f} vs payroll net AED {net_pay:.2f} "
                                f"({round(diff_pct * 100)}% variance)"
                            ),
                            "evidence": {
                                "claimed": total_amount,
                                "payrollNet": net_pay,
                                "variancePct": round(diff_pct * 100),
                            },
                        })
                        total_score += score
                    elif diff_pct > 0.25:
                        reasons.append({
                            "checkType": "amount_variance",
                            "score": 15,
                            "reason": f"Payout amount differs from payroll by {round(diff_pct * 100)}%",
                            "evidence": {"claimed": total_amount, "payrollNet": net_pay},
                        })
                        total_score += 15

            doc_name = (extracted.get("employeeName") or "").split("Client Code")[0].split("client code")[0].strip()
            doc_emp_code = extracted.get("employeeId")
            if emp_id and doc_name and doc_emp_code:
                cur.execute('SELECT name, "employeeId" FROM employees WHERE id = %s', (emp_id,))
                erp_emp = cur.fetchone()
                if erp_emp and doc_name.lower() != erp_emp["name"].lower():
                    reasons.append({
                        "checkType": "identity_mismatch",
                        "score": 35,
                        "reason": (
                            f'Document name "{doc_name}" does not match ERP '
                            f'"{erp_emp["name"]}" for {doc_emp_code}'
                        ),
                        "evidence": {"documentName": doc_name, "erpName": erp_emp["name"]},
                    })
                    total_score += 35

        cur.close()
        conn.close()
    except Exception as e:
        print(f"Fraud DB error: {e}")

    fraud_score = min(100, total_score)
    risk = _risk_level(fraud_score)

    return {
        "fraudScore": fraud_score,
        "riskLevel": risk,
        "reasons": reasons or [{"checkType": "clean", "score": 0, "reason": "No fraud indicators detected"}],
    }
