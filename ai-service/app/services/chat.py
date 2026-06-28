import json
import re
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import get_settings
from app.services.gemini import generate_text

GENERIC_FALLBACK = (
    "I'm the FlowInvoice AI assistant. I can help with invoice status, validation explanations, "
    "employee lookups, and revenue summaries. How can I help?"
)

TIMESHEET_STATS_SQL = """
SELECT
  COUNT(*) AS total,
  SUM(CASE WHEN status = 'PENDING_REVIEW' THEN 1 ELSE 0 END) AS pending_review,
  SUM(CASE WHEN status = 'PENDING_CLIENT_APPROVAL' THEN 1 ELSE 0 END) AS pending_client,
  SUM(CASE WHEN status = 'EXCEPTION' THEN 1 ELSE 0 END) AS exceptions,
  SUM(CASE WHEN status IN ('PENDING_REVIEW', 'PENDING_CLIENT_APPROVAL', 'EXCEPTION') THEN 1 ELSE 0 END) AS needs_attention
FROM timesheets
{where}
"""


def get_db():
    settings = get_settings()
    url = settings.database_url.split("?")[0]
    return psycopg2.connect(url, cursor_factory=RealDictCursor)


def _int(val) -> int:
    return int(val or 0)


def load_context(role: str, client_id: str | None) -> dict:
    context: dict = {}

    try:
        conn = get_db()
        cur = conn.cursor()

        if client_id:
            cur.execute('SELECT name, "clientCode", currency FROM clients WHERE id = %s', (client_id,))
            client = cur.fetchone()
            context["client"] = dict(client) if client else {}

            cur.execute(TIMESHEET_STATS_SQL.format(where='WHERE "clientId" = %s'), (client_id,))
            context["timesheet_stats"] = {k: _int(v) if k != "total" else _int(v) for k, v in dict(cur.fetchone()).items()}

            cur.execute(
                'SELECT "invoiceNumber", status, "grandTotal", currency FROM invoices WHERE "clientId" = %s ORDER BY "createdAt" DESC LIMIT 5',
                (client_id,),
            )
            context["recent_invoices"] = [dict(r) for r in cur.fetchall()]
        elif role in ("FINOPS", "FINANCE"):
            cur.execute(TIMESHEET_STATS_SQL.format(where=""))
            row = dict(cur.fetchone())
            context["workspace_timesheet_stats"] = {k: _int(v) for k, v in row.items()}

            cur.execute(
                """
                SELECT status, COUNT(*) AS count
                FROM timesheets
                WHERE status IN ('PENDING_REVIEW', 'PENDING_CLIENT_APPROVAL', 'VALIDATING', 'FRAUD_CHECKING', 'EXCEPTION')
                GROUP BY status
                """
            )
            context["timesheet_queue"] = {r["status"]: _int(r["count"]) for r in cur.fetchall()}

            cur.execute(
                'SELECT COUNT(*) AS total, SUM("grandTotal") AS revenue FROM invoices WHERE status NOT IN (%s, %s)',
                ("CANCELLED", "DRAFT"),
            )
            inv = dict(cur.fetchone())
            context["invoice_summary"] = {
                "total_invoices": _int(inv.get("total")),
                "total_revenue": float(inv.get("revenue") or 0),
            }

        cur.execute("SELECT COUNT(*) AS total FROM employees")
        context["total_employees"] = _int(cur.fetchone()["total"])

        cur.close()
        conn.close()
    except Exception as exc:
        context["db_error"] = str(exc)

    return context


def _stats(context: dict) -> dict | None:
    return context.get("timesheet_stats") or context.get("workspace_timesheet_stats")


def try_direct_answer(message: str, context: dict) -> str | None:
    m = message.lower().strip()
    stats = _stats(context)

    review_patterns = (
        r"human review",
        r"manual review",
        r"pending review",
        r"need(s)? (human )?review",
        r"timesheets? (to|for|need|requiring) review",
        r"how many.*review",
        r"review queue",
    )
    if stats and any(re.search(p, m) for p in review_patterns):
        pending = stats.get("pending_review", 0)
        client_pending = stats.get("pending_client", 0)
        exceptions = stats.get("exceptions", 0)
        if pending == 0 and client_pending == 0 and exceptions == 0:
            scope = context.get("client", {}).get("name", "the workspace")
            return f"There are currently no timesheets pending human review for {scope}."
        lines = []
        if pending:
            lines.append(f"{pending} awaiting FinOps review (PENDING_REVIEW)")
        if client_pending:
            lines.append(f"{client_pending} awaiting client approval")
        if exceptions:
            lines.append(f"{exceptions} in exception status")
        return (
            f"Timesheets needing human attention: {stats.get('needs_attention', pending + client_pending + exceptions)} total.\n"
            + "\n".join(f"• {line}" for line in lines)
        )

    if stats and re.search(r"how many timesheets?", m):
        return f"There are {stats.get('total', 0)} timesheet(s) in the system."

    if re.search(r"how many employees?", m) and "total_employees" in context:
        return f"There are {context['total_employees']} employees in master data."

    inv_summary = context.get("invoice_summary")
    if inv_summary and re.search(r"(revenue|invoices? (count|total))", m):
        return (
            f"Invoice summary: {inv_summary['total_invoices']} active invoice(s), "
            f"total value AED {inv_summary['total_revenue']:,.2f}."
        )

    recent = context.get("recent_invoices")
    if recent is not None and re.search(r"recent invoices?", m):
        if not recent:
            return "No invoices found for your client yet."
        lines = [
            f"• {r['invoiceNumber']} — {r['status']} — {r['currency']} {float(r['grandTotal'] or 0):,.2f}"
            for r in recent
        ]
        return "Recent invoices:\n" + "\n".join(lines)

    queue = context.get("timesheet_queue")
    if queue and re.search(r"(queue|pipeline|processing)", m):
        if not queue:
            return "No timesheets are currently in validation, fraud check, or review queues."
        lines = [f"• {status.replace('_', ' ').title()}: {count}" for status, count in queue.items()]
        return "Current processing queue:\n" + "\n".join(lines)

    return None


async def chat(message: str, user_id: str, role: str, client_id: str | None, history: list | None) -> dict:
    context_data = load_context(role, client_id)

    direct = try_direct_answer(message, context_data)
    if direct:
        return {"reply": direct}

    hist = "\n".join(f"{h['role']}: {h['content']}" for h in (history or [])[-6:])

    prompt = f"""You are the FlowInvoice AI assistant for TASC FinOps.
Answer using ONLY the live workspace data below. Be concise (2-4 sentences). Use numbers from the data.

User role: {role}
Live workspace data (JSON):
{json.dumps(context_data, default=str)}

Conversation history:
{hist}

User question: {message}

If the data contains the answer, state it clearly with counts and statuses.
If db_error is present, say you could not reach the database briefly.
Never invent numbers not in the data."""

    reply = await generate_text(prompt, fallback="", timeout=90.0)
    reply = (reply or "").strip()

    if not reply or reply == GENERIC_FALLBACK:
        fallback = try_direct_answer(message, context_data)
        reply = fallback or (
            "I couldn't reach the language model right now. "
            "Try asking: 'How many timesheets need human review?' or 'How many employees are in the system?'"
        )

    return {"reply": reply}
