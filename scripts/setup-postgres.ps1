#Requires -Version 5.1
<#
.SYNOPSIS
  Bootstrap local PostgreSQL for FlowInvoice AI (no Docker).

.EXAMPLE
  # Set your PostgreSQL superuser password (chosen during install), then:
  $env:POSTGRES_PASSWORD = "your-postgres-password"
  .\scripts\setup-postgres.ps1

.EXAMPLE
  .\scripts\setup-postgres.ps1 -PostgresPassword "your-postgres-password"
#>
param(
  [string]$PostgresUser = "postgres",
  [string]$PostgresPassword = $env:POSTGRES_PASSWORD,
  [string]$PostgresHost = "localhost",
  [int]$PostgresPort = 5432,
  [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot ".."))
)

$ErrorActionPreference = "Stop"

# Load POSTGRES_PASSWORD from root .env if not set
if (-not $PostgresPassword) {
  $envFile = Join-Path $ProjectRoot ".env"
  if (Test-Path $envFile) {
    $line = Get-Content $envFile | Where-Object { $_ -match '^\s*POSTGRES_PASSWORD\s*=\s*(.+)\s*$' } | Select-Object -First 1
    if ($line -match '=\s*(.+)$') {
      $PostgresPassword = $matches[1].Trim().Trim('"').Trim("'")
    }
  }
}

function Find-Psql {
  $candidates = @(
    "C:\Program Files\PostgreSQL\18\bin\psql.exe",
    "C:\Program Files\PostgreSQL\17\bin\psql.exe",
    "C:\Program Files\PostgreSQL\16\bin\psql.exe"
  )
  foreach ($path in $candidates) {
    if (Test-Path $path) { return $path }
  }
  $fromPath = Get-Command psql -ErrorAction SilentlyContinue
  if ($fromPath) { return $fromPath.Source }
  throw "psql not found. Add PostgreSQL bin to PATH or install PostgreSQL."
}

if (-not $PostgresPassword) {
  $secure = Read-Host "PostgreSQL password for user '$PostgresUser'" -AsSecureString
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try { $PostgresPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
  finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}

$psql = Find-Psql
$sqlFile = Join-Path $PSScriptRoot "setup-postgres.sql"
$env:PGPASSWORD = $PostgresPassword

Write-Host "==> Checking PostgreSQL service..." -ForegroundColor Cyan
$svc = Get-Service -Name "*postgres*" -ErrorAction SilentlyContinue | Where-Object { $_.Status -eq 'Running' } | Select-Object -First 1
if (-not $svc) {
  throw "PostgreSQL service is not running. Start it from Services (services.msc) or pgAdmin."
}
Write-Host "    Running: $($svc.DisplayName)" -ForegroundColor Green

Write-Host "==> Creating FlowInvoice AI database and user..." -ForegroundColor Cyan
& $psql -U $PostgresUser -h $PostgresHost -p $PostgresPort -d postgres -v ON_ERROR_STOP=1 -f $sqlFile
if ($LASTEXITCODE -ne 0) { throw "Failed to run setup-postgres.sql" }

Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue

$databaseUrl = "postgresql://tia:tia_secret@${PostgresHost}:${PostgresPort}/tia_db?schema=public"
$rootEnv = Join-Path $ProjectRoot ".env"
$backendEnv = Join-Path $ProjectRoot "backend\.env"

Write-Host "==> Updating .env files..." -ForegroundColor Cyan
if (Test-Path $rootEnv) {
  $content = Get-Content $rootEnv -Raw
  if ($content -match '(?m)^DATABASE_URL=') {
    $content = $content -replace '(?m)^DATABASE_URL=.*$', "DATABASE_URL=$databaseUrl"
  } else {
    $content = "DATABASE_URL=$databaseUrl`n" + $content
  }
  Set-Content -Path $rootEnv -Value $content.TrimEnd() -NoNewline
  Add-Content -Path $rootEnv -Value "`n"
} else {
  Copy-Item (Join-Path $ProjectRoot ".env.example") $rootEnv
  (Get-Content $rootEnv -Raw) -replace '(?m)^DATABASE_URL=.*$', "DATABASE_URL=$databaseUrl" | Set-Content $rootEnv
}

@"
# Auto-managed for local PostgreSQL (no Docker)
DATABASE_URL=$databaseUrl
"@ | Set-Content $backendEnv

Set-Location $ProjectRoot

Write-Host "==> Generating sample ERP Excel (if missing)..." -ForegroundColor Cyan
$dataFile = Join-Path $ProjectRoot "data\TASC_Sample_Database.xlsx"
if (-not (Test-Path $dataFile)) {
  npx tsx backend/scripts/generateSampleExcel.ts
}

Write-Host "==> Pushing Prisma schema..." -ForegroundColor Cyan
npm run db:push
if ($LASTEXITCODE -ne 0) { throw "db:push failed" }

Write-Host "==> Seeding master data..." -ForegroundColor Cyan
npm run db:seed
if ($LASTEXITCODE -ne 0) { throw "db:seed failed" }

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "  Database : tia_db @ ${PostgresHost}:${PostgresPort}"
Write-Host "  App user : tia / tia_secret"
Write-Host "  Demo logins: finops@tia.local | finance@tia.local | client@tia.local"
Write-Host ""
Write-Host "Start the app: npm run dev" -ForegroundColor Cyan
