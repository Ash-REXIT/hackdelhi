# One-command startup for FlowInvoice AI (Windows)
# Usage: .\scripts\docker-start.ps1   OR   npm run start

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error "Docker is not installed. Install Docker Desktop: https://www.docker.com/products/docker-desktop/"
}

Write-Host ""
Write-Host "FlowInvoice AI — starting full stack (Postgres + API + AI + Ollama + UI)" -ForegroundColor Cyan
Write-Host "First run builds images and may download the Ollama model (~4 GB)." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example" -ForegroundColor Green
}

docker compose up --build -d

Write-Host ""
Write-Host "Waiting for services..." -ForegroundColor Cyan
$deadline = (Get-Date).AddMinutes(20)
while ((Get-Date) -lt $deadline) {
  $backend = docker inspect --format='{{.State.Health.Status}}' tia-backend 2>$null
  $frontend = docker inspect --format='{{.State.Status}}' tia-frontend 2>$null
  if ($backend -eq "healthy" -and $frontend -eq "running") { break }
  Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "Ready!" -ForegroundColor Green
Write-Host "  App:        http://localhost:5173"
Write-Host "  Backend:    http://localhost:3001/api/health"
Write-Host "  AI service: http://localhost:8000/api/health"
Write-Host ""
Write-Host "Demo logins: admin@flowinvoice.ai | user@client.com | manager@flowinvoice.ai"
Write-Host "Logs: npm run docker:logs"
Write-Host ""
