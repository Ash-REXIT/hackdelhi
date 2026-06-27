-- Human-in-the-Loop: anomalies, review decisions, validation rules

CREATE TABLE IF NOT EXISTS anomalies (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(20) NOT NULL,
  entity_id VARCHAR(50) NOT NULL,
  client_id VARCHAR(20),
  anomaly_type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) DEFAULT 'warning',
  description TEXT,
  status VARCHAR(20) DEFAULT 'open',
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by VARCHAR(100),
  resolution_note TEXT
);

CREATE TABLE IF NOT EXISTS review_decisions (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(20) NOT NULL,
  entity_id VARCHAR(50) NOT NULL,
  decision VARCHAR(20) NOT NULL,
  decided_by VARCHAR(100),
  reason TEXT,
  anomalies_count INT DEFAULT 0,
  ai_confidence DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS validation_rule_results (
  id SERIAL PRIMARY KEY,
  invoice_id VARCHAR(50) NOT NULL,
  rule_name VARCHAR(100) NOT NULL,
  passed BOOLEAN DEFAULT FALSE,
  message TEXT,
  severity VARCHAR(20) DEFAULT 'info',
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS erp_jobs (
  id SERIAL PRIMARY KEY,
  timesheet_id VARCHAR(50),
  invoice_id VARCHAR(50),
  status VARCHAR(30) DEFAULT 'queued',
  step VARCHAR(100),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  output_file VARCHAR(255),
  error_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_anomalies_entity ON anomalies(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_anomalies_status ON anomalies(status);
CREATE INDEX IF NOT EXISTS idx_review_entity ON review_decisions(entity_type, entity_id);
