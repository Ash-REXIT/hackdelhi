#!/usr/bin/env sh
set -e
cd "$(dirname "$0")/.."

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed. Install Docker Desktop or Docker Engine."
  exit 1
fi

echo ""
echo "FlowInvoice AI — starting full stack (Postgres + API + AI + Ollama + UI)"
echo "First run builds images and may download the Ollama model (~4 GB)."
echo ""

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

docker compose up --build -d

echo ""
echo "Waiting for services..."
deadline=$(( $(date +%s) + 1200 ))
while [ "$(date +%s)" -lt "$deadline" ]; do
  backend=$(docker inspect --format='{{.State.Health.Status}}' tia-backend 2>/dev/null || echo "")
  frontend=$(docker inspect --format='{{.State.Status}}' tia-frontend 2>/dev/null || echo "")
  if [ "$backend" = "healthy" ] && [ "$frontend" = "running" ]; then
    break
  fi
  sleep 3
done

echo ""
echo "Ready!"
echo "  App:        http://localhost:5173"
echo "  Backend:    http://localhost:3001/api/health"
echo "  AI service: http://localhost:8000/api/health"
echo ""
echo "Demo logins: admin@flowinvoice.ai | user@client.com | manager@flowinvoice.ai"
echo "Logs: npm run docker:logs"
echo ""
