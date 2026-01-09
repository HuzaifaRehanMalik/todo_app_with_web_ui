from sqlmodel import Session, select
from models.todo_model import Todo, TodoCreate, TodoUpdate
from typing import List, Optional


def create_todo(session: Session, todo: TodoCreate) -> Todo:
    """Create a new todo item"""
    db_todo = Todo.from_orm(todo) if hasattr(Todo, 'from_orm') else Todo.model_validate(todo)
    # For SQLModel, we need to handle this differently
    db_todo = Todo(
        title=todo.title,
        description=todo.description,
        completed=todo.completed
    )
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo


def get_todo_by_id(session: Session, todo_id: int) -> Optional[Todo]:
    """Get a todo by its ID"""
    return session.get(Todo, todo_id)


def get_all_todos(session: Session, skip: int = 0, limit: int = 100) -> List[Todo]:
    """Get all todos with optional pagination"""
    statement = select(Todo).offset(skip).limit(limit)
    todos = session.exec(statement).all()
    return todos


def update_todo(session: Session, todo_id: int, todo_update: TodoUpdate) -> Optional[Todo]:
    """Update a todo item"""
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        return None

    todo_data = todo_update.model_dump(exclude_unset=True)
    for key, value in todo_data.items():
        setattr(db_todo, key, value)

    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo


def delete_todo(session: Session, todo_id: int) -> bool:
    """Delete a todo item"""
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        return False

    session.delete(db_todo)
    session.commit()
    return True


def complete_todo(session: Session, todo_id: int) -> Optional[Todo]:
    """Mark a todo as completed"""
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        return None

    db_todo.completed = True
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo