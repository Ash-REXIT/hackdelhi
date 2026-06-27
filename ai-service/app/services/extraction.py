import json
import re
from app.services.gemini import generate_json


EXTRACTION_PROMPT = """Extract timesheet data from the following document text.
Return JSON with these fields:
- employeeId (string)
- employeeName (string)
- clientCode (string)
- workingDays (number)
- overtime (number)
- reimbursements (number)
- payrollPeriod (string, e.g. "June2026")
- fieldConfidence (object mapping each field name to confidence 0-100)

Document text:
{text}
"""


def heuristic_extract(text: str) -> dict:
    data = {
        "employeeId": "",
        "employeeName": "",
        "clientCode": "",
        "workingDays": 0,
        "overtime": 0,
        "reimbursements": 0,
        "payrollPeriod": "June2026",
    }
    confidence = {}

    emp_id = re.search(r"(?:employee\s*id|emp\s*id|id)[:\s]+([A-Z0-9-]+)", text, re.I)
    if emp_id:
        data["employeeId"] = emp_id.group(1)
        confidence["employeeId"] = 85

    name = re.search(r"(?:employee\s*name|name)[:\s]+([A-Za-z\s]+)", text, re.I)
    if name:
        data["employeeName"] = name.group(1).strip()
        confidence["employeeName"] = 80

    days = re.search(r"(?:working\s*days|days\s*worked)[:\s]+(\d+)", text, re.I)
    if days:
        data["workingDays"] = int(days.group(1))
        confidence["workingDays"] = 88

    ot = re.search(r"(?:overtime|ot)\s*(?:hours?)?\s*[:\-]\s*(\d+\.?\d*)", text, re.I) or re.search(
        r"(?:overtime|ot)\s*(?:hours?)?\s+(\d+\.?\d*)", text, re.I
    ) or re.search(r"(\d+\.?\d*)\s*(?:hours?\s*)?(?:overtime|ot)\b", text, re.I)
    if ot:
        data["overtime"] = float(ot.group(1))
        confidence["overtime"] = 85

    reimb = re.search(r"(?:reimbursement|reimb)[:\s]+(\d+\.?\d*)", text, re.I)
    if reimb:
        data["reimbursements"] = float(reimb.group(1))
        confidence["reimbursements"] = 82

    client = re.search(r"(?:client\s*code|customer)[:\s]+([A-Z0-9-]+)", text, re.I)
    if client:
        data["clientCode"] = client.group(1)
        confidence["clientCode"] = 78

    period = re.search(r"(?:period|payroll)[:\s]+([A-Za-z0-9]+)", text, re.I)
    if period:
        data["payrollPeriod"] = period.group(1)
        confidence["payrollPeriod"] = 90

    for field in ["employeeId", "employeeName", "clientCode", "workingDays", "overtime", "reimbursements", "payrollPeriod"]:
        if field not in confidence:
            confidence[field] = 45 if data.get(field.replace("workingDays", "workingDays")) else 30

    return {"data": data, "confidence": confidence}


async def extract_timesheet(text: str, file_type: str) -> dict:
    prompt = EXTRACTION_PROMPT.format(text=text[:8000])
    fallback = heuristic_extract(text)

    result = await generate_json(prompt, {
        **fallback["data"],
        "fieldConfidence": fallback["confidence"],
    })

    confidence = result.pop("fieldConfidence", fallback["confidence"])
    data = {
        "employeeId": str(result.get("employeeId", "") or fallback["data"]["employeeId"]),
        "employeeName": str(result.get("employeeName", "") or fallback["data"]["employeeName"]),
        "clientCode": str(result.get("clientCode", "") or fallback["data"]["clientCode"]),
        "workingDays": int(result.get("workingDays", 0) or fallback["data"]["workingDays"] or 0),
        "overtime": float(result.get("overtime", 0) or fallback["data"]["overtime"] or 0),
        "reimbursements": float(result.get("reimbursements", 0) or fallback["data"]["reimbursements"] or 0),
        "payrollPeriod": str(result.get("payrollPeriod", "") or fallback["data"]["payrollPeriod"] or "June2026"),
    }

    for field, fb_conf in fallback["confidence"].items():
        if fb_conf >= 80 and (field not in confidence or (confidence.get(field) or 0) < fb_conf):
            if field in data and data.get(field.replace("workingDays", "workingDays")):
                confidence[field] = max(confidence.get(field, 0), fb_conf)

    return {"data": data, "confidence": confidence}
