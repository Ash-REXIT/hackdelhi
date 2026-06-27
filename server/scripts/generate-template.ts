import * as XLSX from 'xlsx'
import fs from 'fs/promises'
import path from 'path'

const sampleData = [
  ['Client', 'Employee Name', 'Employee ID', 'Project Code', 'Date', 'Regular Hours', 'Overtime Hours', 'Notes', 'Billing Period'],
  ['Infosys Pvt Ltd', 'Amit Singh', 'EMP-1001', 'PRJ-4521', '2024-06-03', 8, 0, '', 'June 2024'],
  ['Infosys Pvt Ltd', 'Amit Singh', 'EMP-1001', 'PRJ-4521', '2024-06-04', 8, 1.5, 'Client demo', 'June 2024'],
  ['Infosys Pvt Ltd', 'Priya Nair', 'EMP-1002', 'PRJ-4521', '2024-06-03', 8, 0, '', 'June 2024'],
  ['Infosys Pvt Ltd', 'Priya Nair', 'EMP-1002', 'PRJ-4521', '2024-06-04', 7, 0, '', 'June 2024'],
  ['Infosys Pvt Ltd', 'Rahul Verma', 'EMP-1003', 'PRJ-7890', '2024-06-03', 8, 0, '', 'June 2024'],
  ['Infosys Pvt Ltd', 'Rahul Verma', 'EMP-1003', 'PRJ-7890', '2024-06-04', 8, 2, 'Release week', 'June 2024'],
  ['Infosys Pvt Ltd', 'Sneha Patel', 'EMP-1004', 'PRJ-4521', '2024-06-03', 8, 0, '', 'June 2024'],
  ['Infosys Pvt Ltd', 'Deepak Rao', 'EMP-1005', '', '2024-06-03', 9, 0, 'Project TBD', 'June 2024'],
]

async function main() {
  const dir = path.join(process.cwd(), 'data', 'import')
  await fs.mkdir(dir, { recursive: true })

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(sampleData)
  ws['!cols'] = [{ wch: 18 }, { wch: 16 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 20 }, { wch: 14 }]
  XLSX.utils.book_append_sheet(wb, ws, 'Timesheet')

  const outPath = path.join(dir, 'timesheet-template.xlsx')
  XLSX.writeFile(wb, outPath)
  console.log(`✓ Template created: ${outPath}`)
  console.log('  Copy your Excel data into this format, or place your .xlsx file in data/import/')
}

main()
