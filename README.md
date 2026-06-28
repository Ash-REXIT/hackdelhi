# FlowInvoice AI

Full-stack timesheet-to-invoice platform (main branch UI + PostgreSQL backend).

## Quick start (local dev — use if Docker is broken)

```powershell
npm install
npm run setup:ai            # Python deps for ai-service
npm run setup:db            # schema + seed (needs PostgreSQL on :5432)
npm run dev                 # frontend :5173 + backend :3001 + ai :8000
```

**PostgreSQL not installed?** Run `.\scripts\setup-postgres.ps1` (uses `POSTGRES_PASSWORD` from `.env`).

**Optional local AI:** install [Ollama](https://ollama.com), then `ollama pull qwen2.5:7b`. Without Ollama, rule-based fallbacks still work.

## Quick start (Docker — when Docker Desktop works)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) or Docker Engine (Linux).

```powershell
git clone https://github.com/Ash-REXIT/hackdelhi.git
cd hackdelhi
npm run start
```

That **one command** builds and starts everything:

- PostgreSQL (with TASC seed data from `data/TASC_Sample_Database_vF_payroll.xlsx`)
- Backend API
- AI service
- **Ollama** + automatic `qwen2.5:7b` model download
- Frontend UI

First run may take **10–20 minutes** (Docker images + ~4 GB model). Later starts are much faster.

Open **http://localhost:5173** when containers are up.

| Service    | URL |
|------------|-----|
| App (UI)   | http://localhost:5173 |
| Backend    | http://localhost:3001/api/health |
| AI service | http://localhost:8000/api/health |
| Ollama     | http://localhost:11434 |

```powershell
npm run docker:logs    # follow logs
npm run docker:down    # stop
npm run docker:reset   # wipe DB + model cache and rebuild
```

Optional: add `GEMINI_API_KEY` to `.env` (copy from `.env.example`) for cloud AI instead of Ollama.

### Troubleshooting

| Problem | Fix |
|---------|-----|
| Docker Desktop won't open / 500 errors | Run `.\scripts\fix-docker-desktop.ps1` as Admin, or use **local dev** above |
| `input/output error` during pull | Restart Docker, ensure **~15 GB free disk**, run `npm run start` again |
| Ollama model still downloading | App works immediately; check `docker compose logs ollama -f` |
| Port already in use | Stop local Postgres/Node or change ports in `docker-compose.yml` |
| Fresh rebuild | `npm run docker:reset` |

## Quick start (local dev, no full Docker)

Same as above — or Postgres-only in Docker if Desktop works:

```powershell
npm run docker:db           # PostgreSQL only in Docker
npm install
npm run setup:ai
npm run setup:db
npm run dev
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
| `npm run start` | **Full Docker stack** (Postgres + API + AI + Ollama + UI) |
| `npm run docker:logs` | Follow container logs |
| `npm run docker:down` | Stop containers |
| `npm run docker:reset` | Wipe volumes and rebuild |
| `npm run docker:db` | PostgreSQL only (for local `npm run dev`) |
| `npm run dev` | Frontend + backend + AI (local, no full Docker) |
| `npm run db:reseed` | Reload Excel into PostgreSQL |
| `npm run generate:test-cases` | Regenerate sample files |
