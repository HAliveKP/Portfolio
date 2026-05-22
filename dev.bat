@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
echo Starting HK Cyber Terminal Dev Server...
echo.
set NODE_ENV=development
set PORT=3000
echo NODE_ENV: %NODE_ENV%
echo PORT: %PORT%
echo.
echo Running: npm run dev
npm run dev
pause
