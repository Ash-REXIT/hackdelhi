#!/bin/sh
set -e

cd /app/backend

echo "==> Waiting for PostgreSQL..."
until pg_isready -h postgres -U tia -d tia_db >/dev/null 2>&1; do
  sleep 2
done

echo "==> Applying database schema..."
npx prisma db push

echo "==> Seeding database (if needed)..."
if ls /app/data/*.xlsx >/dev/null 2>&1; then
  npx tsx scripts/seedDatabase.ts || echo "Full seed failed — check logs above"
else
  echo "No Excel in data/ — running minimal Docker seed (add TASC *.xlsx for full ERP data)"
  npx tsx scripts/dockerMinimalSeed.ts
fi

echo "==> Starting backend on port ${PORT:-3001}..."
exec npx tsx src/index.ts
