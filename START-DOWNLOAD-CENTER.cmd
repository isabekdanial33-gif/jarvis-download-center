@echo off
cd /d "%~dp0"
if not exist "OPEN-DOWNLOADS.html" (
  echo Download page is missing. Run: npm run sync-releases
  pause
  exit /b 1
)
start "" "%~dp0OPEN-DOWNLOADS.html"
