const API_BASE = '/api'

export interface DbHealth {
  status: string
  databases: { postgres: boolean; mysql: boolean }
  message: string
}

async function fetchJson<T>(path: string, fallback?: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch {
    if (fallback !== undefined) return fallback
    throw new Error(`API unavailable: ${path}`)
  }
}

export const api = {
  health: () => fetchJson<DbHealth>('/health', {
    status: 'offline',
    databases: { postgres: false, mysql: false },
    message: 'API offline — using local mock data',
  }),

  clients: () => fetchJson<Record<string, unknown>[]>('/clients'),
  client: (id: string) => fetchJson<Record<string, unknown>>(`/clients/${id}`),

  timesheets: (clientId?: string) =>
    fetchJson<Record<string, unknown>[]>(clientId ? `/timesheets?clientId=${clientId}` : '/timesheets'),

  timesheet: (id: string) => fetchJson<Record<string, unknown>>(`/timesheets/${id}`),

  createTimesheet: (data: Record<string, unknown>) =>
    fetch(`${API_BASE}/timesheets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  importExcel: (file: File, clientId: string) => {
    const form = new FormData()
    form.append('file', file)
    form.append('clientId', clientId)
    return fetch(`${API_BASE}/import/excel`, { method: 'POST', body: form }).then(async (r) => {
      const data = await r.json()
      if (!r.ok) throw new Error(data.error || 'Import failed')
      return data as {
        success: boolean
        timesheetId: string
        employeeCount: number
        totalHours: number
        entryCount: number
        message: string
      }
    })
  },

  downloadTemplate: () => `${API_BASE}/import/template`,

  timesheetEntries: (timesheetId: string) =>
    fetchJson<Record<string, unknown>[]>(`/import/timesheets/${timesheetId}/entries`, []),

  verificationReports: () => fetchJson<Record<string, unknown>[]>('/verification-reports'),
  verificationReport: (timesheetId: string) =>
    fetchJson<Record<string, unknown>>(`/verification-reports/${timesheetId}`),

  invoices: (clientId?: string) =>
    fetchJson<Record<string, unknown>[]>(clientId ? `/invoices?clientId=${clientId}` : '/invoices'),

  notifications: (role: 'client' | 'admin') =>
    fetchJson<Record<string, unknown>[]>(`/notifications/${role}`),

  auditLogs: () => fetchJson<Record<string, unknown>[]>('/audit-logs').catch(() => []),
  exceptions: () => fetchJson<Record<string, unknown>[]>('/exceptions').catch(() => []),
  analytics: () => fetchJson<Record<string, unknown>>('/analytics').catch(() => ({})),
  kpis: () => fetchJson<Record<string, unknown>>('/kpis').catch(() => ({})),

  // HITL Review
  reviewTimesheet: (id: string, action: 'approve' | 'reject' | 'return', reason?: string) =>
    fetch(`${API_BASE}/review/timesheet/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, reason, reviewer: 'TASC Admin' }),
    }).then(async (r) => {
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Review failed')
      return d
    }),

  reviewInvoice: (id: string, action: 'approve' | 'reject', reason?: string) =>
    fetch(`${API_BASE}/review/invoice/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, reason, reviewer: 'TASC Admin' }),
    }).then(async (r) => {
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Review failed')
      return d
    }),

  clientReviewInvoice: (id: string, action: 'approve' | 'reject', reason?: string) =>
    fetch(`${API_BASE}/review/client/invoice/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, reason, reviewer: 'Client' }),
    }).then(async (r) => {
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Review failed')
      return d
    }),

  detectAnomalies: (timesheetId: string) =>
    fetch(`${API_BASE}/review/timesheet/${timesheetId}/detect-anomalies`, { method: 'POST' }).then((r) => r.json()),

  getAnomalies: (entityId?: string, status?: string) => {
    const params = new URLSearchParams()
    if (entityId) params.set('entityId', entityId)
    if (status) params.set('status', status)
    return fetchJson<Record<string, unknown>[]>(`/review/anomalies?${params}`, [])
  },

  validateInvoice: (invoiceId: string) =>
    fetch(`${API_BASE}/review/invoice/${invoiceId}/validate`, { method: 'POST' }).then((r) => r.json()),

  getValidationRules: (invoiceId: string) =>
    fetchJson<Record<string, unknown>[]>(`/review/invoice/${invoiceId}/validation-rules`, []),

  runErpProcess: (timesheetId: string) =>
    fetch(`${API_BASE}/review/erp/process/${timesheetId}`, { method: 'POST' }).then(async (r) => {
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'ERP failed')
      return d as { jobId: number; outputFile: string; status: string }
    }),

  getErpJobs: () => fetchJson<Record<string, unknown>[]>('/review/erp/jobs', []),

  updateClient: (id: string, data: Record<string, unknown>) =>
    fetch(`${API_BASE}/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
}
