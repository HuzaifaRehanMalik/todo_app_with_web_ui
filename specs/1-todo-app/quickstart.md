# Quickstart Guide: Todo App Development

**Feature**: Todo App Full-Stack (1-todo-app)
**Date**: 2026-01-05

## Overview
This guide provides step-by-step instructions to set up and run the Todo application for development.

## Prerequisites

### System Requirements
- Node.js 18+ with npm/yarn
- Python 3.11+
- PostgreSQL client tools (for local development)
- Git

### Environment Setup
1. Clone the repository
2. Install system dependencies

## Backend Setup (FastAPI)

### 1. Create Python Virtual Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install fastapi uvicorn sqlmodel python-multipart python-dotenv
pip install -r requirements.txt
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
SECRET_KEY=your-secret-key-here
DEBUG=true
```

### 4. Database Setup
1. Ensure PostgreSQL is running
2. Run database migrations:
```bash
# If using alembic for migrations
alembic upgrade head
```

### 5. Run Backend Server
```bash
cd backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`

API documentation will be available at: `http://localhost:8000/docs`

## Frontend Setup (Next.js)

### 1. Install Dependencies
```bash
cd frontend
npm install
# or
yarn install
```

### 2. Environment Configuration
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 3. Run Development Server
```bash
cd frontend
npm run dev
# or
yarn dev
```

Frontend will be available at: `http://localhost:3000`

## Database Setup (Neon PostgreSQL)

### 1. Create Neon Project
1. Sign up at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string

### 2. Configure Connection
Update your `.env` file with the Neon connection string:
```
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/todo_app?sslmode=require
```

### 3. Run Migrations
```bash
cd backend
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── models/
│   │   └── task_model.py      # Task entity definition
│   ├── services/
│   │   └── task_service.py    # Business logic
│   ├── api/
│   │   └── routes/
│   │       └── tasks.py       # API endpoints
│   ├── database/
│   │   └── database.py        # Database connection
│   └── main.py                # Application entry point
├── tests/
│   ├── unit/
│   └── integration/
├── requirements.txt
├── alembic/
└── .env
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx       # Task creation form
│   │   ├── TaskList.tsx       # Task listing component
│   │   ├── TaskItem.tsx       # Individual task component
│   │   └── ExportButton.tsx   # Export functionality
│   ├── pages/
│   │   └── index.tsx          # Main page
│   ├── services/
│   │   └── api.ts             # API client
│   ├── types/
│   │   └── Task.ts            # TypeScript types
│   └── styles/
│       └── globals.css        # Global styles
├── public/
├── package.json
└── tsconfig.json
```

## Development Commands

### Backend Commands
```bash
# Run tests
cd backend
python -m pytest

# Run with auto-reload
uvicorn src.main:app --reload

# Format code
black src/
isort src/

# Run linter
flake8 src/
```

### Frontend Commands
```bash
# Run development server
cd frontend
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Format code
npm run format

# Run linter
npm run lint
```

## API Testing
After starting the backend, you can test the API endpoints:

1. **Swagger UI**: Visit `http://localhost:8000/docs`
2. **API Endpoints**:
   - GET `/api/v1/tasks` - List all tasks
   - POST `/api/v1/tasks` - Create a task
   - GET `/api/v1/tasks/{id}` - Get specific task
   - PUT `/api/v1/tasks/{id}` - Update task
   - PATCH `/api/v1/tasks/{id}` - Partial update
   - DELETE `/api/v1/tasks/{id}` - Delete task
   - GET `/api/v1/tasks/export` - Export tasks to .txt

## Running Tests

### Backend Tests
```bash
cd backend
# Run all tests
python -m pytest

# Run with coverage
python -m pytest --cov=src

# Run specific test file
python -m pytest tests/unit/test_tasks.py
```

### Frontend Tests
```bash
cd frontend
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Building for Production

### Backend
```bash
cd backend
pip install -r requirements.txt
# Deploy with uvicorn or containerize with Docker
```

### Frontend
```bash
cd frontend
npm run build
# The build output will be in the `out` directory for static hosting
```

## Docker Setup (Optional)

### Build and Run with Docker
```bash
# Build containers
docker-compose build

# Run application
docker-compose up

# Run in detached mode
docker-compose up -d
```

## Troubleshooting

### Common Issues
1. **Port already in use**: Change port in uvicorn command or kill the process using the port
2. **Database connection failed**: Check DATABASE_URL in .env file
3. **Frontend can't connect to backend**: Ensure backend is running and check NEXT_PUBLIC_API_URL

### Debugging
1. Check console logs in both backend and frontend
2. Verify environment variables are set correctly
3. Ensure database is accessible
4. Confirm API endpoints match the contract

## Next Steps
1. Implement the data models as defined in `data-model.md`
2. Create the API routes following the contract in `contracts/api-contract.md`
3. Build the frontend components following the design in `spec.md`
4. Write tests for all functionality
5. Deploy to staging environment