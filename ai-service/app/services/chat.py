import json
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import get_settings
from app.services.gemini import generate_text


def get_db():
    settings = get_settings()
    return psycopg2.connect(settings.database_url, cursor_factory=RealDictCursor)


async def chat(message: str, user_id: str, role: str, client_id: str | None, history: list | None) -> dict:
    context_data = {}

    try:
        conn = get_db()
        cur = conn.cursor()

        if client_id:
            cur.execute('SELECT name, "clientCode", currency FROM clients WHERE id = %s', (client_id,))
            client = cur.fetchone()
            context_data["client"] = dict(client) if client else {}

            cur.execute(
                'SELECT COUNT(*) as timesheets, SUM(CASE WHEN status = %s THEN 1 ELSE 0 END) as pending FROM timesheets WHERE "clientId" = %s',
                ("PENDING_REVIEW", client_id),
            )
            context_data["timesheet_stats"] = dict(cur.fetchone())

            cur.execute(
                'SELECT "invoiceNumber", status, "grandTotal", currency FROM invoices WHERE "clientId" = %s ORDER BY "createdAt" DESC LIMIT 5',
                (client_id,),
            )
            context_data["recent_invoices"] = [dict(r) for r in cur.fetchall()]

        cur.execute('SELECT COUNT(*) as total FROM employees')
        context_data["total_employees"] = cur.fetchone()["total"]

        cur.close()
        conn.close()
    except Exception as e:
        context_data["db_error"] = str(e)

    hist = "\n".join(f"{h['role']}: {h['content']}" for h in (history or [])[-6:])

    prompt = f"""You are the FlowInvoice AI assistant for TASC.
User role: {role}
User ID: {user_id}
Client context: {json.dumps(context_data, default=str)}

Conversation history:
{hist}

User message: {message}

Answer helpfully about invoices, timesheets, validation, payroll, employees, and revenue.
Be concise and professional. If you don't have data, say so."""

    reply = await generate_text(
        prompt,
        "I'm the FlowInvoice AI assistant. I can help with invoice status, validation explanations, employee lookups, and revenue summaries. How can I help?",
    )

    return {"reply": reply}
