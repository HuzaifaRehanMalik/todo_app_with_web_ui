<!--
SYNC IMPACT REPORT:
Version change: 1.0.0 → 1.0.0 (initial creation)
Modified principles: None (new constitution)
Added sections: All sections (initial creation)
Removed sections: None
Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: None
-->

# Todo App Constitution

## Core Principles

### I. Full-Stack Development with Next.js and FastAPI
The application follows a modern full-stack architecture with Next.js for frontend and FastAPI for backend. Frontend must be built with TypeScript and Tailwind CSS for consistent styling. Backend must use FastAPI with SQLModel ORM and Neon Serverless PostgreSQL for data persistence.

### II. Feature-First Implementation
Every feature must be implemented with both frontend and backend components simultaneously. All features must be testable in isolation and integration. Each feature must have proper error handling and validation on both ends.

### III. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced. All API endpoints must have unit tests. All UI components must have integration tests.

### IV. Type Safety and Validation
All data contracts must be strongly typed with TypeScript interfaces. Backend must validate all inputs before processing. Frontend must validate user inputs before sending to backend. SQLModel models must match database schema exactly.

### V. Task Management Core Features
The application must support: Adding tasks with title and description, Listing all tasks with status indicators, Updating task details, Deleting tasks by ID, Marking tasks as complete/incomplete, Importing tasks from .txt files named by date.

### VI. Data Persistence and Migration
Database schema changes must follow proper migration patterns. Data integrity must be maintained during all operations. Backup and recovery procedures must be considered in implementation.

## Technology Stack Requirements
Frontend: Next.js 14+, TypeScript 5+, Tailwind CSS 3+
Backend: FastAPI 0.104+, Python 3.11+, SQLModel 0.0.8+
Database: Neon Serverless PostgreSQL
Development: Node.js 18+, npm/yarn, Python virtual environments

## Development Workflow
All code changes must pass linting and type checking before merging. API endpoints must be documented with OpenAPI/Swagger. Frontend components must be responsive and accessible. Code reviews required for all pull requests. Automated tests must pass before deployment.

## Governance
This constitution supersedes all other development practices. All pull requests and code reviews must verify compliance with these principles. Complexity must be justified with clear benefits. Use this constitution for development guidance and decision-making.

**Version**: 1.0.0 | **Ratified**: 2026-01-05 | **Last Amended**: 2026-01-05
