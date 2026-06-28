# Sample Timesheets for Testing

Upload these from **Client Portal → Upload** (`user@client.com`).

| Case | File | What it tests |
|------|------|----------------|
| 1 Happy path | `case-1/case1-email-payout.txt` | Carlos Smith @ Emirates Steel — name match, no employee ID |
| 1 Ambiguity | `case-1/case1-ambiguous-aisha.txt` | Multiple "Aisha Al Zaabi" in ERP — human review |
| 2 Employee email | `case-2/case2-email-employee.txt` | Employee ID only, no client |
| 3 Client list | `case-3/case3-email-client-list.txt` | Multiple employees in one email |
| 4 Handwritten sim | `case-4/case4-handwritten-scan.txt` | OCR-style messy text |
| 5 Excel punch | `case-5/case5-punch-timesheet.xlsx` | Punch in/out + leave codes |
| 6 Structured email | `case-6/case6-email-structured.txt` | All fields present |
| 7 Clean Excel | `case-7/case7-complete-timesheet.xlsx` | Full match — should auto-invoice |

See also: **[Fraud demo timesheets](fraud/FRAUD-SAMPLES.md)** (`fraud-1` … `fraud-6`) for fraud detection testing.

## Demo logins

| Role | Email |
|------|-------|
| FinOps (admin) | `admin@flowinvoice.ai` |
| Client upload | `user@client.com` |
| Finance | `manager@flowinvoice.ai` |

## Flow

1. Login as **user@client.com** → Upload a sample file
2. Login as **admin@flowinvoice.ai** → FinOps Dashboard / Timesheet Inbox / Review Queue
3. Check **Validation Center** for rule failures and fraud flags
