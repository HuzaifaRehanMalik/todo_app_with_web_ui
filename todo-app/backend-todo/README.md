# Todo Application Backend

A complete backend for a todo application built with FastAPI, SQLModel, and Neon DB.

## Features

1. Add task
2. List tasks
3. Update task
4. Complete task
5. Delete task
6. Show task
7. Export todos to Desktop (.txt) when requested

## Installation

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your environment variables:
```bash
cp .env.example .env
```
Then edit the `.env` file with your Neon DB connection string.

3. Run the application:
```bash
python main.py
```

## API Endpoints

### Todo Management
- `POST /api/v1/todos/` - Create a new todo
- `GET /api/v1/todos/` - List all todos
- `GET /api/v1/todos/{id}` - Get a specific todo
- `PUT /api/v1/todos/{id}` - Update a specific todo
- `PATCH /api/v1/todos/{id}/complete` - Mark a todo as completed
- `DELETE /api/v1/todos/{id}` - Delete a specific todo

### Export
- `GET /api/v1/export/todos` - Export all todos to a .txt file on the desktop

## Environment Variables

- `DATABASE_URL` - Connection string for the Neon DB

## Database

The application uses SQLModel with PostgreSQL (Neon DB) to store todo items.