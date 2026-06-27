# FlowInvoice AI

Full-stack timesheet-to-invoice platform (main branch UI + PostgreSQL backend).

## Quick start

```powershell
cd d:\hackarena
npm install
npm run setup:db    # first time: schema + seed ERP data
npm run dev         # frontend :5173 + backend :3001
```

## Demo logins

| Portal | Email | Route |
|--------|-------|-------|
| FinOps (admin) | `admin@flowinvoice.ai` | `/workspace` |
| Client upload | `user@client.com` | `/portal/upload` |
| Finance | `manager@flowinvoice.ai` | `/operations` |

## Test flow

1. Login as **user@client.com** → **Portal → Upload**
2. Upload a file from `data/test-cases/` (see `data/test-cases/SAMPLES.md`)
3. Login as **admin@flowinvoice.ai** → **FinOps Dashboard** / **Timesheet Inbox** / **Review Queue**

## Sample files

- `case-1/case1-email-payout.txt` — happy path (Carlos Smith)
- `case-1/case1-ambiguous-aisha.txt` — ambiguous name review
- `case-7/case7-complete-timesheet.xlsx` — auto-invoice candidate

## Stack

- **Frontend:** React 19 + Vite (root `src/`)
- **Backend:** Express + Prisma + PostgreSQL (`backend/`)
- **Rules:** Validation + fraud detection in `backend/src/services/`

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend + backend |
| `npm run db:reseed` | Reload Excel into PostgreSQL |
| `npm run generate:test-cases` | Regenerate sample files |
