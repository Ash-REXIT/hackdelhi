#Requires -Version 5.1
<#
.SYNOPSIS
  Recover Docker Desktop when it won't open or returns 500 errors.

.EXAMPLE
  .\scripts\fix-docker-desktop.ps1
#>
$ErrorActionPreference = "Continue"

Write-Host "`n=== Docker Desktop recovery ===" -ForegroundColor Cyan
Write-Host "Run PowerShell as Administrator for best results.`n"

Write-Host "1) Stopping Docker processes..." -ForegroundColor Yellow
Get-Process "Docker Desktop", "com.docker.backend", "com.docker.build" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

Write-Host "2) Stopping Docker service..." -ForegroundColor Yellow
Stop-Service com.docker.service -Force -ErrorAction SilentlyContinue

Write-Host "3) Shutting down WSL..." -ForegroundColor Yellow
wsl --shutdown 2>$null
Start-Sleep -Seconds 5

Write-Host "4) Starting Docker service..." -ForegroundColor Yellow
Start-Service com.docker.service -ErrorAction SilentlyContinue

Write-Host "5) Launching Docker Desktop..." -ForegroundColor Yellow
$dockerExe = "${env:ProgramFiles}\Docker\Docker\Docker Desktop.exe"
if (Test-Path $dockerExe) {
  Start-Process $dockerExe
  Write-Host "   Wait 1–2 minutes until Docker shows 'Engine running'." -ForegroundColor Green
} else {
  Write-Host "   Docker Desktop not found at $dockerExe" -ForegroundColor Red
  Write-Host "   Reinstall from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
}

Write-Host "`nIf Docker still fails:" -ForegroundColor Cyan
Write-Host "  • Docker Desktop → Settings → Troubleshoot → Clean / Purge data"
Write-Host "  • Ensure ~15 GB free disk (images + Ollama model are large)"
Write-Host "  • Settings → General → Use WSL 2 based engine (enabled)"
Write-Host "  • Windows Update → install latest WSL: wsl --update"
Write-Host "`nWork without Docker:" -ForegroundColor Cyan
Write-Host "  npm install"
Write-Host "  npm run setup:ai"
Write-Host "  .\scripts\setup-postgres.ps1   # if Postgres not installed"
Write-Host "  npm run setup:db"
Write-Host "  npm run dev"
Write-Host ""
