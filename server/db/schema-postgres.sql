-- FlowInvoice AI — PostgreSQL Schema (Primary OLTP Database)

CREATE TABLE IF NOT EXISTS clients (
  id VARCHAR(20) PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  email VARCHAR(255),
  billing_entity VARCHAR(255),
  currency VARCHAR(10) DEFAULT 'INR',
  dispatch_rule VARCHAR(255),
  validation_profile VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  billing_rate DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS timesheets (
  id VARCHAR(30) PRIMARY KEY,
  client_id VARCHAR(20) REFERENCES clients(id),
  client_name VARCHAR(255),
  employees INT DEFAULT 0,
  employee_names JSONB DEFAULT '[]',
  upload_date TIMESTAMPTZ,
  source VARCHAR(20),
  file_name VARCHAR(255),
  ocr_accuracy DECIMAL(5,2),
  ai_confidence DECIMAL(5,2),
  risk_score INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'processing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS verification_reports (
  id VARCHAR(20) PRIMARY KEY,
  timesheet_id VARCHAR(30) REFERENCES timesheets(id),
  client_name VARCHAR(255),
  employee_validation JSONB,
  working_hours_validation JSONB,
  project_validation JSONB,
  duplicate_detection JSONB,
  missing_fields JSONB,
  ocr_accuracy DECIMAL(5,2),
  document_quality DECIMAL(5,2),
  risk_score INT,
  ai_confidence DECIMAL(5,2),
  recommendation TEXT,
  ai_explanation JSONB DEFAULT '[]',
  evidence_timeline JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
  id VARCHAR(20) PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE,
  client_id VARCHAR(20) REFERENCES clients(id),
  client_name VARCHAR(255),
  timesheet_id VARCHAR(30),
  amount DECIMAL(14,2),
  gst DECIMAL(14,2),
  grand_total DECIMAL(14,2),
  generated_date DATE,
  billing_period VARCHAR(100),
  employees JSONB DEFAULT '[]',
  total_hours INT,
  billing_rate DECIMAL(12,2),
  status VARCHAR(20),
  dispatch_status VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(20) PRIMARY KEY,
  role VARCHAR(10) DEFAULT 'client',
  title VARCHAR(255),
  message TEXT,
  type VARCHAR(20),
  timestamp TIMESTAMPTZ,
  read BOOLEAN DEFAULT FALSE,
  link VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_timesheets_client ON timesheets(client_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_status ON timesheets(status);
CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_notifications_role ON notifications(role);

CREATE TABLE IF NOT EXISTS timesheet_entries (
  id SERIAL PRIMARY KEY,
  timesheet_id VARCHAR(30) REFERENCES timesheets(id) ON DELETE CASCADE,
  employee_name VARCHAR(255),
  employee_id VARCHAR(50),
  project_code VARCHAR(100),
  work_date DATE,
  regular_hours DECIMAL(6,2) DEFAULT 0,
  overtime_hours DECIMAL(6,2) DEFAULT 0,
  total_hours DECIMAL(6,2) DEFAULT 0,
  notes TEXT,
  raw_row JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entries_timesheet ON timesheet_entries(timesheet_id);
CREATE INDEX IF NOT EXISTS idx_entries_employee ON timesheet_entries(employee_name);
