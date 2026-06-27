import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import get_settings
from difflib import SequenceMatcher


def get_db():
    settings = get_settings()
    return psycopg2.connect(settings.database_url, cursor_factory=RealDictCursor)


def fuzzy_ratio(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


async def match_employee(extracted: dict, client_id: str) -> dict:
    employee_id = extracted.get("employeeId", "")
    employee_name = extracted.get("employeeName", "")
    client_code = extracted.get("clientCode", "")

    try:
        conn = get_db()
        cur = conn.cursor()

        if client_code:
            cur.execute('SELECT id FROM clients WHERE "clientCode" = %s', (client_code,))
            row = cur.fetchone()
            if row:
                client_id = row["id"]

        if employee_id:
            cur.execute(
                'SELECT id, "employeeId", name FROM employees WHERE "clientId" = %s AND "employeeId" = %s',
                (client_id, employee_id),
            )
            exact = cur.fetchone()
            if exact:
                cur.close()
                conn.close()
                return {
                    "matched": True,
                    "employeeId": exact["employeeId"],
                    "employeeName": exact["name"],
                    "confidence": 99.0,
                    "matchType": "exact_id",
                }

        if employee_name:
            cur.execute(
                'SELECT e.id, e."employeeId", e.name, c."clientCode", c.name AS "clientName" '
                'FROM employees e JOIN clients c ON c.id = e."clientId" '
                'WHERE LOWER(e.name) = LOWER(%s)',
                (employee_name,),
            )
            global_matches = cur.fetchall()
            if len(global_matches) > 1:
                candidates = [
                    {
                        "employeeId": row["employeeId"],
                        "name": row["name"],
                        "clientCode": row["clientCode"],
                        "clientName": row["clientName"],
                    }
                    for row in global_matches
                ]
                cur.close()
                conn.close()
                return {
                    "matched": False,
                    "confidence": 42.0,
                    "matchType": "no_match",
                    "warnings": [
                        f'Ambiguous name: {employee_name} — {len(global_matches)} employees with this name across clients'
                    ],
                    "candidates": candidates,
                }

            cur.execute(
                'SELECT id, "employeeId", name FROM employees WHERE "clientId" = %s',
                (client_id,),
            )
            employees = cur.fetchall()
            best = None
            best_score = 0.0
            for emp in employees:
                score = fuzzy_ratio(employee_name, emp["name"])
                if score > best_score:
                    best_score = score
                    best = emp

            if best and best_score >= 0.85:
                cur.close()
                conn.close()
                return {
                    "matched": True,
                    "employeeId": best["employeeId"],
                    "employeeName": best["name"],
                    "confidence": round(best_score * 100, 1),
                    "matchType": "name_match" if best_score > 0.95 else "fuzzy_match",
                    "warnings": [] if best_score > 0.95 else ["Fuzzy name match used"],
                }

        cur.close()
        conn.close()
    except Exception as e:
        print(f"DB match error: {e}")

    return {
        "matched": False,
        "confidence": 20.0,
        "matchType": "no_match",
        "warnings": ["No matching employee found in database"],
    }
