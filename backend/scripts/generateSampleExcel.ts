/**
 * Generates TASC_Sample_Database.xlsx for one-time seeding.
 * Run: npx tsx scripts/generateSampleExcel.ts
 */
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const dataDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const customers = [
  { Client_Code: 'CLI001', Name: 'Acme Corporation', Email: 'billing@acme.com', Currency: 'USD', Tax_Rate: 10, Address: '100 Main St, New York' },
  { Client_Code: 'CLI002', Name: 'Globex Industries', Email: 'ap@globex.com', Currency: 'USD', Tax_Rate: 8, Address: '200 Industrial Ave, Chicago' },
  { Client_Code: 'CLI003', Name: 'Initech Ltd', Email: 'finance@initech.com', Currency: 'USD', Tax_Rate: 12, Address: '300 Tech Park, Austin' },
];

const employees = [
  { Employee_ID: 'EMP001', Name: 'John Smith', Client_Code: 'CLI001', Email: 'john.smith@acme.com', Designation: 'Software Engineer', Hourly_Rate: 75 },
  { Employee_ID: 'EMP002', Name: 'Jane Doe', Client_Code: 'CLI001', Email: 'jane.doe@acme.com', Designation: 'Project Manager', Hourly_Rate: 95 },
  { Employee_ID: 'EMP003', Name: 'Bob Wilson', Client_Code: 'CLI002', Email: 'bob@globex.com', Designation: 'Data Analyst', Hourly_Rate: 65 },
  { Employee_ID: 'EMP004', Name: 'Alice Brown', Client_Code: 'CLI002', Email: 'alice@globex.com', Designation: 'DevOps Engineer', Hourly_Rate: 85 },
  { Employee_ID: 'EMP005', Name: 'Charlie Davis', Client_Code: 'CLI003', Email: 'charlie@initech.com', Designation: 'QA Engineer', Hourly_Rate: 60 },
  { Employee_ID: 'EMP006', Name: 'Diana Prince', Client_Code: 'CLI003', Email: 'diana@initech.com', Designation: 'Tech Lead', Hourly_Rate: 110 },
];

const payroll = [
  { Employee_ID: 'EMP001', Client_Code: 'CLI001', Base_Salary: 12000, Hourly_Rate: 75, Overtime_Rate: 112.5, Working_Days: 22, Currency: 'USD' },
  { Employee_ID: 'EMP002', Client_Code: 'CLI001', Base_Salary: 15200, Hourly_Rate: 95, Overtime_Rate: 142.5, Working_Days: 22, Currency: 'USD' },
  { Employee_ID: 'EMP003', Client_Code: 'CLI002', Base_Salary: 10400, Hourly_Rate: 65, Overtime_Rate: 97.5, Working_Days: 21, Currency: 'USD' },
  { Employee_ID: 'EMP004', Client_Code: 'CLI002', Base_Salary: 13600, Hourly_Rate: 85, Overtime_Rate: 127.5, Working_Days: 21, Currency: 'USD' },
  { Employee_ID: 'EMP005', Client_Code: 'CLI003', Base_Salary: 9600, Hourly_Rate: 60, Overtime_Rate: 90, Working_Days: 20, Currency: 'USD' },
  { Employee_ID: 'EMP006', Client_Code: 'CLI003', Base_Salary: 17600, Hourly_Rate: 110, Overtime_Rate: 165, Working_Days: 20, Currency: 'USD' },
];

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(customers), 'Customers');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(employees), 'Employees');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(payroll), 'Payroll_June2026');

const outPath = path.join(dataDir, 'TASC_Sample_Database.xlsx');
XLSX.writeFile(wb, outPath);
console.log('Generated:', outPath);
