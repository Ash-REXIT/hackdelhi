-- TASC Sample Database tables (from TASC_Sample_Database_vF.xlsx)

CREATE TABLE IF NOT EXISTS employees (
  id VARCHAR(20) PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  client_id VARCHAR(20) REFERENCES clients(id),
  client_name VARCHAR(255),
  job_title VARCHAR(255),
  department VARCHAR(255),
  nationality VARCHAR(100),
  date_of_joining DATE,
  status VARCHAR(20) DEFAULT 'Active',
  iban VARCHAR(50),
  basic DECIMAL(12,2) DEFAULT 0,
  housing DECIMAL(12,2) DEFAULT 0,
  transport DECIMAL(12,2) DEFAULT 0,
  food DECIMAL(12,2) DEFAULT 0,
  phone DECIMAL(12,2) DEFAULT 0,
  total_ctc DECIMAL(12,2) DEFAULT 0,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payroll_records (
  id SERIAL PRIMARY KEY,
  emp_id VARCHAR(20),
  employee_name VARCHAR(255),
  client_id VARCHAR(20),
  client_name VARCHAR(255),
  pay_period VARCHAR(50),
  basic DECIMAL(12,2) DEFAULT 0,
  housing DECIMAL(12,2) DEFAULT 0,
  transport DECIMAL(12,2) DEFAULT 0,
  food DECIMAL(12,2) DEFAULT 0,
  phone DECIMAL(12,2) DEFAULT 0,
  gross DECIMAL(12,2) DEFAULT 0,
  ot_hours DECIMAL(6,2) DEFAULT 0,
  ot_amount DECIMAL(12,2) DEFAULT 0,
  deductions DECIMAL(12,2) DEFAULT 0,
  net_pay DECIMAL(12,2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'AED',
  working_days INT DEFAULT 0,
  timesheet_id VARCHAR(30),
  invoice_id VARCHAR(20),
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employees_client ON employees(client_id);
CREATE INDEX IF NOT EXISTS idx_payroll_client ON payroll_records(client_id);
CREATE INDEX IF NOT EXISTS idx_payroll_period ON payroll_records(pay_period);
