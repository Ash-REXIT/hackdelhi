# Install MySQL on Windows for FlowInvoice AI audit database
# Run in PowerShell as Administrator:
#   Set-ExecutionPolicy -Scope Process Bypass; .\scripts\install-mysql.ps1

Write-Host "FlowInvoice AI — MySQL Installer" -ForegroundColor Cyan
Write-Host ""

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "WARNING: Run as Administrator for best results." -ForegroundColor Yellow
}

Write-Host "Attempting MySQL install via winget..." -ForegroundColor Green
try {
    winget install Oracle.MySQL --accept-package-agreements --accept-source-agreements
    Write-Host "MySQL installed. Set root password to 'flowinvoice' during setup." -ForegroundColor Green
} catch {
    Write-Host "Winget install failed. Manual steps:" -ForegroundColor Yellow
    Write-Host "1. Download MySQL Community Server: https://dev.mysql.com/downloads/mysql/"
    Write-Host "2. Install with root password: flowinvoice"
    Write-Host "3. Copy .env.example to .env and set MYSQL_PASSWORD=flowinvoice"
}

Write-Host ""
Write-Host "After install, restart the API: npm run server" -ForegroundColor Cyan
