# FlowInvoice AI — Touchless Invoice Agent (TIA)

Enterprise-grade AI SaaS billing platform built for **TASC**. Converts client timesheets into ERP-uploadable invoices with AI-powered validation and minimal human intervention.

## Quick Start

```bash
npm install
npm run dev:all    # Starts API server + frontend together
```

Or run separately:
```bash
npm run server     # API + PostgreSQL (embedded, auto-downloads)
npm run dev        # Frontend at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) and choose **Client Portal** or **TASC Admin**.

## Database Setup

### PostgreSQL (Primary — automatic)
PostgreSQL runs **embedded** via npm — no manual install needed. Data is stored in `data/postgres/`.

### MySQL (Audit & Analytics — optional)
MySQL stores audit logs, exception tracking, and analytics snapshots.

**Install MySQL on Windows:**
```bash
npm run db:install-mysql
```
Or download from [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) and set root password to `flowinvoice`.

Copy `.env.example` to `.env` and adjust credentials if needed.

### Connection Status
Look for **PG ✓ | MySQL ✓** badge in the app header when both databases are connected.

### API Endpoints
- `GET /api/health` — database connection status
- `GET /api/clients` — client list (PostgreSQL)
- `GET /api/timesheets` — timesheets (PostgreSQL)
- `GET /api/invoices` — invoices (PostgreSQL)
- `GET /api/audit-logs` — audit trail (MySQL)
- `POST /api/timesheets` — upload new timesheet

## Features

### Client Portal
- Dashboard with KPIs and activity timeline
- Drag-and-drop timesheet upload (PDF, Excel, Images, ZIP, Email)
- Animated AI processing pipeline
- Verification reports with AI explanations
- Invoice management and downloads
- Floating AI assistant

### TASC Admin
- Operations dashboard with 8 KPI cards
- Client management and configuration
- Incoming timesheets with search/sort/pagination
- AI Review Queue and Evidence Engine
- Invoice generator with SAP export
- Dispatch center with status tracking
- Exception center with filtering
- Analytics dashboard (9 interactive charts)
- Audit logs and notifications
- AI Copilot

### Global
- Dark/Light mode toggle
- Global search
- Animated counters
- Status badges (Approved, Pending, Critical, Processing)
- Responsive desktop & tablet layout

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS 4
- Lucide Icons
- Framer Motion
- Recharts
- React Router 7

## Demo Flow

1. **Client**: Upload Timesheet → AI Processing → Verification Report → Invoices
2. **Admin**: Incoming Timesheets → AI Review Queue → Evidence Engine → Invoice Generator → Dispatch

© 2024 TASC · FlowInvoice AI v2.1
