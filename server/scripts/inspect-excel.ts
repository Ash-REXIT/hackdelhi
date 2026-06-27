import XLSX from 'xlsx'

const file = process.argv[2] || 'C:/Users/Shwetha/Downloads/TASC_Sample_Database_vF.xlsx'
const wb = XLSX.readFile(file)
console.log('Sheets:', wb.SheetNames)
for (const name of wb.SheetNames) {
  const sheet = wb.Sheets[name]
  const rows = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1, defval: '' })
  console.log(`\n=== ${name} (${rows.length} rows) ===`)
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    console.log(`Row ${i}:`, JSON.stringify(rows[i]))
  }
}
