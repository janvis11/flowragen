@echo off
echo ========================================
echo    RAGFlow - Starting Application
echo ========================================
echo.

echo [1/3] Starting Frontend Server...
start "RAGFlow Frontend" cmd /k "python -m http.server 3000"
timeout /t 2 /nobreak >nul

echo [2/3] Starting Backend Server...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate
if not exist venv\Lib\site-packages\fastapi (
    echo Installing dependencies...
    pip install -r requirements.txt
)

start "RAGFlow Backend" cmd /k "python main.py"
cd ..
timeout /t 3 /nobreak >nul

echo [3/3] Opening Browser...
timeout /t 2 /nobreak >nul
start http://localhost:3000/workflow.html

echo.
echo ========================================
echo    RAGFlow is Running!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Workflow Builder: http://localhost:3000/workflow.html
echo Backend API: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop all servers...
pause >nul

taskkill /FI "WindowTitle eq RAGFlow Frontend*" /T /F
taskkill /FI "WindowTitle eq RAGFlow Backend*" /T /F
