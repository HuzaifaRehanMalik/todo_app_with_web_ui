from sqlmodel import create_engine, Session
from typing import Generator
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

# Create the database engine
# For PostgreSQL/Neon, use the provided URL
# For SQLite (default for local development), use the file-based database
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, echo=True, connect_args=connect_args)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session