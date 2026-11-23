@echo off
echo Installing and checking the build...
call npm install || goto :err
call npm run build || goto :err
echo Pushing to GitHub...
rmdir /s /q .git 2>nul
git init
git add -A
git commit -m "Hacker-theme portfolio"
git branch -M main
git remote add origin https://github.com/naveenad-cyber/naveen-portfolio.git
git push -u origin main --force
echo.
echo DONE. Check Vercel Deployments.
pause
exit /b 0
:err
echo.
echo SOMETHING FAILED - copy the red text above and send it to Claude.
pause
