import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, type DbHealth } from '../api/client'
import * as mock from '../data/mockData'
import type { Client, Timesheet, VerificationReport, Invoice, Notification, AuditLog } from '../types'

interface DataContextType {
  loading: boolean
  dbHealth: DbHealth | null
  clients: Client[]
  timesheets: Timesheet[]
  verificationReports: VerificationReport[]
  invoices: Invoice[]
  clientNotifications: Notification[]
  adminNotifications: Notification[]
  auditLogs: AuditLog[]
  currentClient: Client
  refresh: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [dbHealth, setDbHealth] = useState<DbHealth | null>(null)
  const [clients, setClients] = useState<Client[]>(mock.clients)
  const [timesheets, setTimesheets] = useState<Timesheet[]>(mock.timesheets)
  const [verificationReports, setVerificationReports] = useState<VerificationReport[]>(mock.verificationReports)
  const [invoices, setInvoices] = useState<Invoice[]>(mock.invoices)
  const [clientNotifications, setClientNotifications] = useState<Notification[]>(mock.clientNotifications)
  const [adminNotifications, setAdminNotifications] = useState<Notification[]>(mock.adminNotifications)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mock.auditLogs)

  const load = async () => {
    setLoading(true)
    try {
      const health = await api.health()
      setDbHealth(health)

      if (health.databases.postgres) {
        const [c, t, vr, inv, cn, an, al] = await Promise.all([
          api.clients(),
          api.timesheets(),
          api.verificationReports(),
          api.invoices(),
          api.notifications('client'),
          api.notifications('admin'),
          api.auditLogs(),
        ])
        setClients(c as unknown as Client[])
        setTimesheets(t as unknown as Timesheet[])
        setVerificationReports(vr as unknown as VerificationReport[])
        setInvoices(inv as unknown as Invoice[])
        setClientNotifications(cn as unknown as Notification[])
        setAdminNotifications(an as unknown as Notification[])
        if (Array.isArray(al) && al.length > 0) {
          setAuditLogs(al as unknown as AuditLog[])
        }
      }
    } catch {
      setDbHealth({ status: 'offline', databases: { postgres: false, mysql: false }, message: 'Using mock data' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <DataContext.Provider
      value={{
        loading,
        dbHealth,
        clients,
        timesheets,
        verificationReports,
        invoices,
        clientNotifications,
        adminNotifications,
        auditLogs,
        currentClient: clients.find((c) => c.id === 'CL001') ?? clients.find((c) => c.id === 'cli-001') ?? clients[0] ?? mock.CURRENT_CLIENT,
        refresh: load,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}

export function getVerificationReport(timesheetId: string, reports: VerificationReport[]) {
  return reports.find((r) => r.timesheetId === timesheetId)
}

export function getTimesheet(id: string, sheets: Timesheet[]) {
  return sheets.find((t) => t.id === id)
}

export function getClientInvoices(clientId: string, invs: Invoice[]) {
  return invs.filter((i) => i.clientId === clientId)
}

export function getClientTimesheets(clientId: string, sheets: Timesheet[]) {
  return sheets.filter((t) => t.clientId === clientId)
}
