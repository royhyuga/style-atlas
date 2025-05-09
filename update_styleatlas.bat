
@echo off
cd /d %~dp0
git add .
git commit -m "Update from local script"
git push origin main
pause
