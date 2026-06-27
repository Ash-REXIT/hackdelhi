# TASC Sample Database

Place the official hackathon file here (any of these names work):

```
TASC_Sample_Database_vF_payroll.xlsx   ← current file
TASC_Sample_Database_v2_1.xlsx
```

The seed script auto-detects any `.xlsx` in this folder that has `Customers` + `Employees` sheets.

## Sheets (do not modify — seed reads once)

| Sheet | Rows | Purpose |
|-------|------|---------|
| Customers | 10 | CL001–CL010 clients |
| Employees | 200 | 20 per client, duplicate names for ambiguity |
| Payroll_June2026 | 200 | June 2026 pay run (AED) |
| TestCases | 7 | Case definitions (reference only) |

## Setup

```powershell
npm run db:reseed
npm run generate:test-cases
```

Test inputs are written to `data/test-cases/case-1` … `case-7`.

## Re-seed after replacing Excel

```powershell
npm run db:reseed
npm run generate:test-cases
```
