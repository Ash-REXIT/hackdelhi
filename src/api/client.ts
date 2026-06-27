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
}
