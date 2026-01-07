---
id: 1
title: Create Todo App with FastAPI and Next.js
stage: general
date: 2026-01-05
surface: agent
model: claude-haiku-4-5-20251001
feature: none
branch: master
user: claude
command: sp.implement
labels: ["todo-app", "fastapi", "nextjs", "sqlmodel", "typescript"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\backend\app\models\todo.py
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\backend\app\config\database.py
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\backend\app\services\todo_service.py
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\backend\app\api\todos.py
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\backend\app\main.py
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\frontend\todo-frontend\src\app\types\todo.ts
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\frontend\todo-frontend\src\app\services\todoService.ts
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\frontend\todo-frontend\src\app\components\TodoList.tsx
  - D:\Governer_IT_course\Q4\Hackathon\Todo-app\phase-2\todo-app\frontend\todo-frontend\src\app\page.tsx
tests: []
---

# Create Todo App with FastAPI and Next.js

## User Prompt

creata a uv init project with support to fastapi uvicorn  SQLModel, Neon DB then build a backend for todo aap with
feature like:
1. Add task
2. List tasks
3. Update task
4. Complete task
5. Delete task
6. Show task
7. Export todos to Desktop (.txt)
then creata a frountend that fully support all these feacuter using next.js tailwind and typescript

## Implementation Response

I have successfully created a complete Todo application with the following components:

### Backend (FastAPI)
- Created a uv project with FastAPI, uvicorn, SQLModel, and Neon DB support
- Implemented SQLite for development (with Neon DB configuration ready for production)
- Created Todo model with SQLModel supporting all required fields
- Implemented API endpoints for all required features:
  1. Add task: POST /api/todos/
  2. List tasks: GET /api/todos/
  3. Update task: PUT /api/todos/{id}
  4. Complete task: PATCH /api/todos/{id}/complete
  5. Delete task: DELETE /api/todos/{id}
  6. Show task: GET /api/todos/{id}
  7. Export todos to .txt: GET /api/todos/export/txt

### Frontend (Next.js)
- Created a Next.js app with TypeScript, Tailwind CSS
- Created TodoList component with all required functionality
- Connected to backend API with proper service layer
- Implemented all features with responsive UI

### Key Features Implemented
1. Add task: Users can add new todo items with title and description
2. List tasks: View all todos with status indicators
3. Update task: Edit existing todo items
4. Complete task: Mark todos as completed
5. Delete task: Remove todos from the list
6. Show task: View individual todo details
7. Export todos to Desktop (.txt): Export all todos to a timestamped .txt file on the desktop

The application is fully functional and both servers can be started with:
- Backend: cd todo-app/backend && uv run uvicorn app.main:app --reload
- Frontend: cd todo-app/frontend/todo-frontend && npm run dev