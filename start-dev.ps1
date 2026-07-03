# Start Phy70 local dev environment (uses standalone PHP 8.4 at C:\php84)
# Runs the Laravel server (port 8000) and the Vite dev server together.
# Usage:  powershell -ExecutionPolicy Bypass -File .\start-dev.ps1

$ErrorActionPreference = "Stop"
$php = "C:\php84\php.exe"
$root = $PSScriptRoot

if (-not (Test-Path $php)) {
    Write-Error "PHP 8.4 not found at $php. Install it or edit this script."
    exit 1
}

Write-Host "Starting Laravel server on http://localhost:8000 ..." -ForegroundColor Cyan
$laravel = Start-Process -FilePath $php -ArgumentList "artisan","serve","--port=8000" -WorkingDirectory $root -PassThru -NoNewWindow

Write-Host "Starting Vite dev server ..." -ForegroundColor Cyan
$vite = Start-Process -FilePath "npm" -ArgumentList "run","dev" -WorkingDirectory $root -PassThru -NoNewWindow

Write-Host ""
Write-Host "App:        http://localhost:8000" -ForegroundColor Green
Write-Host "Phy70 app:  http://localhost:8000/app/phy70/login" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop both servers." -ForegroundColor Yellow

try {
    Wait-Process -Id $laravel.Id
} finally {
    if ($vite -and -not $vite.HasExited) { Stop-Process -Id $vite.Id -Force }
    if ($laravel -and -not $laravel.HasExited) { Stop-Process -Id $laravel.Id -Force }
}
