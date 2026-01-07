# API Contract: Todo App

**Feature**: Todo App Full-Stack (1-todo-app)
**Date**: 2026-01-05

## Overview
This document defines the API contract for the Todo application based on the functional requirements.

## Base URL
```
http://localhost:8000/api/v1 (development)
https://api.todoapp.com/v1 (production)
```

## Common Headers
```
Content-Type: application/json
Accept: application/json
```

## Authentication
No authentication required for MVP (single-user session)

## API Endpoints

### 1. Create Task
**Endpoint**: `POST /api/v1/tasks`

**Description**: Creates a new task with the provided details.

**Request**:
```json
{
  "title": "Task title",
  "description": "Task description (optional)"
}
```

**Response (201 Created)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Task title",
  "description": "Task description (optional)",
  "status": false,
  "created_at": "2026-01-05T10:00:00.000Z",
  "updated_at": "2026-01-05T10:00:00.000Z"
}
```

**Validation**:
- Title is required and must not be empty
- Title must be between 1-255 characters
- Description can be empty (null) or up to 1000 characters

**Error Responses**:
- 422 Unprocessable Entity: Validation error
- 500 Internal Server Error: Server error

### 2. Get All Tasks
**Endpoint**: `GET /api/v1/tasks`

**Description**: Retrieves all tasks in the system.

**Query Parameters**:
- `status` (optional): Filter by status (true for completed, false for pending, all for both)
- `limit` (optional): Limit number of results (default: 100, max: 1000)
- `offset` (optional): Offset for pagination (default: 0)

**Response (200 OK)**:
```json
{
  "tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Task title",
      "description": "Task description (optional)",
      "status": false,
      "created_at": "2026-01-05T10:00:00.000Z",
      "updated_at": "2026-01-05T10:00:00.000Z"
    }
  ],
  "total": 1,
  "limit": 100,
  "offset": 0
}
```

**Error Responses**:
- 500 Internal Server Error: Server error

### 3. Get Task by ID
**Endpoint**: `GET /api/v1/tasks/{id}`

**Description**: Retrieves a specific task by its ID.

**Path Parameters**:
- `id`: UUID of the task

**Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Task title",
  "description": "Task description (optional)",
  "status": false,
  "created_at": "2026-01-05T10:00:00.000Z",
  "updated_at": "2026-01-05T10:00:00.000Z"
}
```

**Error Responses**:
- 404 Not Found: Task with given ID not found
- 422 Unprocessable Entity: Invalid UUID format
- 500 Internal Server Error: Server error

### 4. Update Task (Full)
**Endpoint**: `PUT /api/v1/tasks/{id}`

**Description**: Updates all fields of a specific task.

**Path Parameters**:
- `id`: UUID of the task

**Request**:
```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "status": true
}
```

**Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated task title",
  "description": "Updated task description",
  "status": true,
  "created_at": "2026-01-05T10:00:00.000Z",
  "updated_at": "2026-01-05T11:00:00.000Z"
}
```

**Validation**:
- All fields are required
- Title must not be empty
- Title must be between 1-255 characters

**Error Responses**:
- 404 Not Found: Task with given ID not found
- 422 Unprocessable Entity: Validation error
- 500 Internal Server Error: Server error

### 5. Partial Update Task
**Endpoint**: `PATCH /api/v1/tasks/{id}`

**Description**: Updates specific fields of a task (commonly used for status updates).

**Path Parameters**:
- `id`: UUID of the task

**Request** (any combination of these fields):
```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "status": true
}
```

**Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated task title",
  "description": "Updated task description",
  "status": true,
  "created_at": "2026-01-05T10:00:00.000Z",
  "updated_at": "2026-01-05T11:00:00.000Z"
}
```

**Validation**:
- At least one field must be provided
- If title is provided, it must not be empty and must be 1-255 characters

**Error Responses**:
- 404 Not Found: Task with given ID not found
- 422 Unprocessable Entity: Validation error
- 500 Internal Server Error: Server error

### 6. Delete Task
**Endpoint**: `DELETE /api/v1/tasks/{id}`

**Description**: Deletes a specific task by its ID.

**Path Parameters**:
- `id`: UUID of the task

**Response (204 No Content)**:
- Empty response body

**Error Responses**:
- 404 Not Found: Task with given ID not found
- 422 Unprocessable Entity: Invalid UUID format
- 500 Internal Server Error: Server error

### 7. Export Tasks
**Endpoint**: `GET /api/v1/tasks/export`

**Description**: Exports all tasks to a .txt file named with the current date.

**Response (200 OK)**:
- Content-Type: text/plain
- Content-Disposition: attachment; filename="tasks-YYYY-MM-DD.txt"

Content format:
```
Todo List - 2026-01-05

[ ] Task 1 title
    Description: Task 1 description

[x] Task 2 title
    Description: Task 2 description

[ ] Task 3 title
    Description: Task 3 description
```

Status indicators:
- `[ ]` for incomplete tasks
- `[x]` for completed tasks

**Error Responses**:
- 500 Internal Server Error: Server error during export

## Error Response Format
All error responses follow this format:
```json
{
  "detail": "Human-readable error message",
  "error_code": "MACHINE_READABLE_ERROR_CODE",
  "timestamp": "2026-01-05T10:00:00.000Z"
}
```

## Data Types
- UUID: String in standard UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
- DateTime: ISO 8601 format (YYYY-MM-DDTHH:MM:SS.sssZ)
- Boolean: true or false
- String: UTF-8 encoded text

## Rate Limiting
- Default rate limit: 100 requests per minute per IP
- Rate limit headers included in all responses:
  - `X-RateLimit-Limit`: Request limit per time period
  - `X-RateLimit-Remaining`: Remaining requests in current period
  - `X-RateLimit-Reset`: Time when rate limit resets