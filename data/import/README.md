# Import Your Excel Data

Place your `.xlsx` or `.xls` file here, then either:

### Option 1 — Upload in the app
1. Run `npm run dev:all`
2. Go to **Client → Upload Timesheet**
3. Select or drag your Excel file

### Option 2 — Command line
```bash
npm run import:excel -- data/import/your-file.xlsx cli-001
```

### Option 3 — Use the template
```bash
npm run excel:template
```
Opens `timesheet-template.xlsx` — copy your data into matching columns.

## Required columns (flexible names accepted)

| Column | Accepted header names |
|--------|----------------------|
| Employee Name | Employee Name, Employee, Name, Consultant |
| Project Code | Project Code, Project, Project ID |
| Date | Date, Work Date |
| Hours | Hours, Regular Hours, Billable Hours |
| Overtime | Overtime, OT Hours (optional) |
| Employee ID | Employee ID, Emp ID (optional) |
| Client | Client, Company (optional — uses logged-in client) |

Your file is automatically parsed, stored in PostgreSQL, AI-validated, and appears in My Timesheets & Verification Reports.

## TASC Sample Database (pre-imported)

The file `TASC_Sample_Database_vF.xlsx` has been imported with:
- **10 clients** (Emirates Steel, Emaar, Dubai Airports, ADNOC, etc.)
- **200 employees** with CTC, department, nationality
- **200 payroll records** for June 2026
- **10 timesheets + invoices** (one per client)

Re-import anytime:
```bash
npm run import:tasc -- "path/to/TASC_Sample_Database_vF.xlsx"
```
