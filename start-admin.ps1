$host.UI.RawUI.WindowTitle = "FUKU-TABI Admin"
Write-Host "=== FUKU-TABI Admin ===" -ForegroundColor Cyan
Write-Host ""

# Desktop = same folder as this script
$desktop = $PSScriptRoot

# Find project folder by walking the directory tree (no Japanese in script)
$orgFolder = Get-ChildItem $desktop -Directory | Where-Object { $_.Name -match "AI" } | Select-Object -First 1
if (-not $orgFolder) {
    Write-Host "ERROR: AI folder not found on Desktop" -ForegroundColor Red
    Read-Host "Press Enter"
    exit 1
}

$travelFolder = Join-Path $orgFolder.FullName "02_Travel\Dev"
$projectFolder = Get-ChildItem $travelFolder -Directory | Select-Object -First 1
if (-not $projectFolder) {
    Write-Host "ERROR: Project folder not found" -ForegroundColor Red
    Read-Host "Press Enter"
    exit 1
}

$projectPath = $projectFolder.FullName
Write-Host "Project: $projectPath" -ForegroundColor Green
Write-Host ""

Set-Location $projectPath

Write-Host "[1/2] Building... (1-2 min)" -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed." -ForegroundColor Red
    Read-Host "Press Enter"
    exit 1
}

Write-Host ""
Write-Host "[2/2] Starting server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  URL     : http://localhost:3000/admin/login" -ForegroundColor Green
Write-Host "  Password: daifuku2026" -ForegroundColor Green
Write-Host ""
Write-Host "  * Do not close this window" -ForegroundColor Yellow
Write-Host ""

Start-Sleep -Seconds 2
Start-Process "http://localhost:3000/admin/login"
npm start
