# Fraud Detection Demo Timesheets

Upload from **Client Portal → Upload** as `user@client.com` (Emirates Steel / CL001).

These files **skip validation** (so they reach fraud checks) but **run full fraud detection**.
The regular `case-1` … `case-7` files still skip fraud for the happy-path demo.

## Quick reference

| File | Fraud signal | Expected risk | What you'll see |
|------|--------------|---------------|-----------------|
| `fraud-1-extreme-overtime.txt` | 72h overtime | **CRITICAL** | `extreme_overtime` — Ahmed Khan |
| `fraud-2-excessive-days.txt` | 32 working days | **HIGH** | `excessive_days` — Carlos Smith |
| `fraud-3-amount-inflation.txt` | AED 52,000 vs ~9,834 payroll | **CRITICAL** | `amount_inflation` |
| `fraud-4-duplicate-upload.txt` | Same file hash | **CRITICAL** on 2nd upload | `duplicate_document` |
| `fraud-5-reimbursement-spike.txt` | AED 18,500 reimbursements | **HIGH** | `reimbursement_spike` |
| `fraud-6-identity-mismatch.txt` | John Smith on EMP10001 (Carlos in ERP) | **HIGH** | `identity_mismatch` |

## Demo flow

1. Login as **user@client.com** → Upload a `fraud-*.txt` file
2. Login as **admin@flowinvoice.ai** → **Review Queue** / **Timesheet Inbox**
3. HIGH or CRITICAL fraud → status **Pending Review** with fraud explanation

## Special instructions

### Duplicate document (`fraud-4`)
1. Upload `fraud-4-duplicate-upload.txt` once — should pass fraud (clean)
2. Upload the **same file again** — second upload flags `duplicate_document` (score +45)

### Duplicate period
If Carlos Smith (EMP10001) was already invoiced for June 2026 (e.g. from `case-1`), uploading another June timesheet for him triggers `duplicate_period`.

## Fraud rules (backend)

| Check | Trigger |
|-------|---------|
| `extreme_overtime` | >60 hours |
| `elevated_overtime` | >45 hours |
| `excessive_days` | >28 working days |
| `high_working_days` | >26 working days |
| `duplicate_document` | Identical file hash already uploaded |
| `duplicate_period` | Same employee + period already in system |
| `amount_inflation` | Claimed amount >50% above payroll net |
| `amount_variance` | Claimed amount >25% above payroll net |
| `reimbursement_spike` | Reimbursements >5,000 / >10,000 AED |
| `identity_mismatch` | Employee ID matches ERP but name differs |
| `suspicious_round_amount` | Round thousands (e.g. AED 50,000) |
| `repeated_submissions` | >5 uploads from client in 24h |

Risk levels: **CRITICAL** ≥70 · **HIGH** ≥50 · **MEDIUM** ≥25 · **LOW** below 25

## Logins

| Role | Email |
|------|-------|
| Client upload | `user@client.com` |
| FinOps review | `admin@flowinvoice.ai` |

See also: [SAMPLES.md](../SAMPLES.md) for validation / workflow test cases (case-1 … case-7).
