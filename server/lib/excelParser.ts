import * as XLSX from 'xlsx'

export interface ParsedTimesheetRow {
  clientName?: string
  employeeName: string
  employeeId?: string
  projectCode?: string
  workDate?: string
  regularHours: number
  overtimeHours: number
  totalHours: number
  notes?: string
  raw: Record<string, unknown>
}

export interface ParsedExcelResult {
  fileName: string
  sheetName: string
  headers: string[]
  rows: ParsedTimesheetRow[]
  clientName?: string
  billingPeriod?: string
}

const COLUMN_ALIASES: Record<string, string[]> = {
  clientName: ['client', 'company', 'company name', 'client name', 'organization'],
  employeeName: ['employee name', 'employee', 'name', 'emp name', 'consultant', 'resource name'],
  employeeId: ['employee id', 'emp id', 'id', 'employee code', 'emp code', 'staff id'],
  projectCode: ['project code', 'project', 'project id', 'project name', 'prj code', 'cost center'],
  workDate: ['date', 'work date', 'timesheet date', 'day', 'entry date'],
  regularHours: ['regular hours', 'hours', 'total hours', 'billable hours', 'std hours', 'normal hours'],
  overtimeHours: ['overtime', 'overtime hours', 'ot hours', 'ot', 'extra hours'],
  notes: ['notes', 'remark', 'remarks', 'comments', 'description'],
  billingPeriod: ['billing period', 'period', 'month', 'week'],
}

function normalizeHeader(h: string): string {
  return String(h ?? '').trim().toLowerCase().replace(/[_\s]+/g, ' ')
}

function matchColumn(header: string): keyof typeof COLUMN_ALIASES | null {
  const n = normalizeHeader(header)
  if (!n) return null
  for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
    if (aliases.some((a) => n === a || n.includes(a))) {
      return field as keyof typeof COLUMN_ALIASES
    }
  }
  return null
}

function parseNumber(val: unknown): number {
  if (val == null || val === '') return 0
  const n = parseFloat(String(val).replace(/[^\d.-]/g, ''))
  return isNaN(n) ? 0 : n
}

function parseDate(val: unknown): string | undefined {
  if (val == null || val === '') return undefined
  if (typeof val === 'number') {
    const d = XLSX.SSF.parse_date_code(val)
    if (d) return `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.d).padStart(2, '0')}`
  }
  const s = String(val).trim()
  const parsed = new Date(s)
  if (!isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10)
  return s || undefined
}

function buildColumnMap(headers: string[]): Map<number, keyof typeof COLUMN_ALIASES> {
  const map = new Map<number, keyof typeof COLUMN_ALIASES>()
  headers.forEach((h, i) => {
    const field = matchColumn(h)
    if (field && !Array.from(map.values()).includes(field)) {
      map.set(i, field)
    }
  })
  return map
}

export function parseExcelBuffer(buffer: Buffer, fileName: string): ParsedExcelResult {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true })
  const sheetName = workbook.SheetNames[0]
  if (!sheetName) throw new Error('Excel file has no sheets')

  const sheet = workbook.Sheets[sheetName]
  const rawRows = XLSX.utils.sheet_to_json<(string | number | null)[]>(sheet, { header: 1, defval: '' })

  if (rawRows.length < 2) throw new Error('Excel file must have a header row and at least one data row')

  let headerRowIndex = 0
  for (let i = 0; i < Math.min(rawRows.length, 10); i++) {
    const row = rawRows[i].map((c) => normalizeHeader(String(c)))
    if (row.some((c) => COLUMN_ALIASES.employeeName.some((a) => c.includes(a)))) {
      headerRowIndex = i
      break
    }
  }

  const headers = rawRows[headerRowIndex].map((h) => String(h ?? '').trim())
  const colMap = buildColumnMap(headers)

  if (!Array.from(colMap.values()).includes('employeeName')) {
    throw new Error(
      `Could not find an "Employee Name" column. Found headers: ${headers.filter(Boolean).join(', ')}. ` +
      'Download the template from Upload page or use columns: Employee Name, Project Code, Date, Hours.'
    )
  }

  const rows: ParsedTimesheetRow[] = []
  let clientName: string | undefined
  let billingPeriod: string | undefined

  for (let r = headerRowIndex + 1; r < rawRows.length; r++) {
    const rowArr = rawRows[r]
    if (!rowArr || rowArr.every((c) => c == null || String(c).trim() === '')) continue

    const raw: Record<string, unknown> = {}
    headers.forEach((h, i) => { if (h) raw[h] = rowArr[i] })

    const parsed: Partial<ParsedTimesheetRow> = { raw, regularHours: 0, overtimeHours: 0, totalHours: 0 }

    colMap.forEach((field, colIdx) => {
      const val = rowArr[colIdx]
      switch (field) {
        case 'clientName':
          parsed.clientName = String(val ?? '').trim()
          break
        case 'employeeName':
          parsed.employeeName = String(val ?? '').trim()
          break
        case 'employeeId':
          parsed.employeeId = String(val ?? '').trim()
          break
        case 'projectCode':
          parsed.projectCode = String(val ?? '').trim()
          break
        case 'workDate':
          parsed.workDate = parseDate(val)
          break
        case 'regularHours':
          parsed.regularHours = parseNumber(val)
          break
        case 'overtimeHours':
          parsed.overtimeHours = parseNumber(val)
          break
        case 'notes':
          parsed.notes = String(val ?? '').trim()
          break
        case 'billingPeriod':
          parsed.billingPeriod = String(val ?? '').trim()
          break
      }
    })

    if (!parsed.employeeName) continue

    parsed.totalHours = (parsed.regularHours ?? 0) + (parsed.overtimeHours ?? 0)
    if (parsed.totalHours === 0 && parsed.regularHours === 0) {
      // try to find any numeric "hours" column in raw
      for (const [k, v] of Object.entries(raw)) {
        if (normalizeHeader(k).includes('hour')) {
          parsed.regularHours = parseNumber(v)
          parsed.totalHours = parsed.regularHours + (parsed.overtimeHours ?? 0)
          break
        }
      }
    }

    if (parsed.clientName && !clientName) clientName = parsed.clientName
    if (parsed.billingPeriod && !billingPeriod) billingPeriod = parsed.billingPeriod as string

    rows.push(parsed as ParsedTimesheetRow)
  }

  if (rows.length === 0) throw new Error('No valid employee rows found in Excel file')

  return { fileName, sheetName, headers, rows, clientName, billingPeriod }
}
