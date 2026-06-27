import hashlib
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import get_settings


def get_db():
    settings = get_settings()
    return psycopg2.connect(settings.database_url, cursor_factory=RealDictCursor)


async def detect_fraud(timesheet_id: str, extracted: dict, file_hash: str | None) -> dict:
    reasons = []
    total_score = 0.0

    overtime = float(extracted.get("overtime", 0))
    working_days = int(extracted.get("workingDays", 0))

    if overtime > 60:
        score = min(30, overtime - 40)
        reasons.append({
            "checkType": "extreme_overtime",
            "score": score,
            "reason": f"Extreme overtime detected: {overtime} hours",
            "evidence": {"overtime": overtime},
        })
        total_score += score

    if working_days > 28:
        score = 15
        reasons.append({
            "checkType": "excessive_days",
            "score": score,
            "reason": f"Unusually high working days: {working_days}",
            "evidence": {"workingDays": working_days},
        })
        total_score += score

    try:
        conn = get_db()
        cur = conn.cursor()

        if file_hash:
            cur.execute(
                'SELECT id, "timesheetId" FROM timesheet_documents WHERE "fileHash" = %s AND "timesheetId" != %s',
                (file_hash, timesheet_id),
            )
            dup_doc = cur.fetchone()
            if dup_doc:
                reasons.append({
                    "checkType": "duplicate_document",
                    "score": 40,
                    "reason": "Duplicate document hash detected",
                    "evidence": {"existingTimesheetId": dup_doc["timesheetId"]},
                })
                total_score += 40

        cur.execute(
            'SELECT COUNT(*) as cnt FROM timesheets WHERE "clientId" = (SELECT "clientId" FROM timesheets WHERE id = %s) AND "createdAt" > NOW() - INTERVAL \'24 hours\'',
            (timesheet_id,),
        )
        recent = cur.fetchone()
        if recent and recent["cnt"] > 5:
            reasons.append({
                "checkType": "repeated_submissions",
                "score": 20,
                "reason": f"High submission frequency: {recent['cnt']} in 24h",
            })
            total_score += 20

        cur.close()
        conn.close()
    except Exception as e:
        print(f"Fraud DB error: {e}")

    fraud_score = min(100, total_score)
    if fraud_score >= 70:
        risk = "CRITICAL"
    elif fraud_score >= 50:
        risk = "HIGH"
    elif fraud_score >= 25:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "fraudScore": fraud_score,
        "riskLevel": risk,
        "reasons": reasons or [{"checkType": "clean", "score": 0, "reason": "No fraud indicators detected"}],
    }
