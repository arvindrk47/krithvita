@echo off
echo Starting Slurrp Farm Clone...

echo Starting Backend...
start cmd /k "cd backend && python manage.py runserver"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo Done. Backend running on port 8000, Frontend on port 5173.
pause
