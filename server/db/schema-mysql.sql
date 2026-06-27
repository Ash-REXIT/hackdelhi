-- FlowInvoice AI — MySQL Schema (Audit & Analytics Database)

CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(20) PRIMARY KEY,
  timestamp DATETIME NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  ai_decision VARCHAR(255),
  invoice_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(14,4),
  period_month VARCHAR(10),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exception_logs (
  id VARCHAR(20) PRIMARY KEY,
  exception_type VARCHAR(100) NOT NULL,
  count INT DEFAULT 0,
  severity ENUM('critical', 'warning', 'info') DEFAULT 'info',
  description TEXT,
  timesheet_id VARCHAR(30),
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS db_sync_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source_db ENUM('postgres', 'mysql') NOT NULL,
  event_type VARCHAR(100),
  payload JSON,
  synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_exception_type ON exception_logs(exception_type);
