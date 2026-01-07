# Data Model: Todo App

**Feature**: Todo App Full-Stack (1-todo-app)
**Date**: 2026-01-05

## Overview
This document defines the data model for the Todo application based on the feature specification requirements.

## Entity Definitions

### Task Entity

**Description**: Represents a single todo item with attributes for tracking and management.

**Fields**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | Primary Key, Required, Auto-generated | Unique identifier for the task |
| title | String | Required, Max 255 chars, Non-empty | The task title/description |
| description | Text | Optional, Max 1000 chars | Detailed description of the task |
| status | Boolean | Required, Default: false | Completion status (false = incomplete, true = complete) |
| created_at | DateTime | Required, Auto-generated | Timestamp when the task was created |
| updated_at | DateTime | Required, Auto-generated | Timestamp when the task was last updated |

**Validation Rules**:
1. Title must not be empty or contain only whitespace
2. Title must be between 1 and 255 characters
3. Description can be empty but limited to 1000 characters if provided
4. Status defaults to false (incomplete) when creating a new task
5. created_at and updated_at are automatically managed by the system

**State Transitions**:
- New Task: status = false (incomplete)
- Update Status: status can be toggled between true (complete) and false (incomplete)
- Update Details: title and/or description can be modified while preserving status

### TaskList (Conceptual)
**Description**: A collection of Task entities, representing the user's current task list.
- This is a conceptual entity since we're not implementing multi-user functionality in the MVP
- All tasks belong to a single session for the MVP

## API Contract Models

### CreateTaskRequest
**Purpose**: Request model for creating a new task

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| title | String | Required | The task title |
| description | String | Optional | Detailed description of the task |

### UpdateTaskRequest
**Purpose**: Request model for updating a task completely

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| title | String | Required | The task title |
| description | String | Optional | Detailed description of the task |
| status | Boolean | Required | Completion status |

### PatchTaskRequest
**Purpose**: Request model for partial task updates (e.g., status change)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| title | String | Optional | The task title (optional for partial update) |
| description | String | Optional | Detailed description of the task (optional) |
| status | Boolean | Optional | Completion status (optional for partial update) |

### TaskResponse
**Purpose**: Response model for task entities

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier for the task |
| title | String | The task title |
| description | String | Detailed description of the task |
| status | Boolean | Completion status |
| created_at | DateTime | Timestamp when the task was created |
| updated_at | DateTime | Timestamp when the task was last updated |

## Database Schema

### Tasks Table
```
Table: tasks
- id: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- title: VARCHAR(255) NOT NULL
- description: TEXT
- status: BOOLEAN NOT NULL DEFAULT FALSE
- created_at: TIMESTAMP WITH TIME ZONE DEFAULT NOW()
- updated_at: TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

### Indexes
- Primary Index: id (automatically created)
- Additional Index: created_at (for sorting tasks by creation date)

## Relationships
- No relationships in the MVP since all tasks are part of a single session
- In future enhancements, tasks could be related to users, categories, or projects

## Business Rules
1. A task must always have a title that is not empty
2. The system automatically manages creation and update timestamps
3. Task status can be changed from complete to incomplete and vice versa
4. All tasks are visible to the current session (no privacy in MVP)
5. Tasks are persisted in the database and survive session refresh

## Validation Requirements
1. Server-side validation: All inputs must be validated on the backend
2. Client-side validation: Frontend should validate inputs before submission
3. Database-level constraints: Use database constraints to ensure data integrity
4. API-level validation: Use FastAPI's Pydantic models for request/response validation