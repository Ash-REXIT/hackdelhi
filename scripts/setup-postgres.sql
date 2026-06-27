-- FlowInvoice AI local PostgreSQL bootstrap (run once as postgres superuser)
-- Creates app user + database matching .env defaults

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'tia') THEN
    CREATE ROLE tia WITH LOGIN PASSWORD 'tia_secret';
  ELSE
    ALTER ROLE tia WITH LOGIN PASSWORD 'tia_secret';
  END IF;
END
$$;

SELECT 'CREATE DATABASE tia_db OWNER tia'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tia_db')\gexec

GRANT ALL PRIVILEGES ON DATABASE tia_db TO tia;
ALTER DATABASE tia_db OWNER TO tia;

\connect tia_db

GRANT ALL ON SCHEMA public TO tia;
ALTER SCHEMA public OWNER TO tia;
