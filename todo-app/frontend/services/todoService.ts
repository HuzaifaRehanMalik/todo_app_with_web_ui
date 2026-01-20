"use client";

import { Todo, TodoCreate, TodoUpdate } from "@/types/todo";
import { tokenStorage } from "./authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://huzaifa035-backend.hf.space";

// Generic API call function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers,
      ...options,
    });

    // Handle 204 No Content responses
    if (response.status === 204) {
      return null as T;
    }

    // Handle non-JSON responses (prevents "Unexpected token <" error)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API call failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } else {
      // If response is not JSON (e.g., HTML error page)
      const text = await response.text();
      // Only log if it's an error status or we expected data
      if (!response.ok) {
        console.error(`API Error (${url}): Expected JSON but got ${contentType}`, text.substring(0, 200));
        throw new Error(`API Error: Received invalid response from server. Status: ${response.status} ${response.statusText}`);
      }
      // If status is OK but not JSON, and not 204, it might be a text response?
      // For now, assume if it's not JSON it's unexpected for this API.
      console.error(`API Unexpected Format (${url}): Expected JSON but got ${contentType}`);
      throw new Error(`API Error: Received invalid response format from server.`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Failed to connect to the server. Please check your internet connection and make sure the backend is reachable.`
      );
    }
    throw error;
  }
}

// Create a new todo
export async function createTodo(todo: TodoCreate): Promise<Todo> {
  return apiCall<Todo>("/todos/", {
    method: "POST",
    body: JSON.stringify(todo),
  });
}

// Get all todos
export async function getAllTodos(skip: number = 0, limit: number = 100): Promise<Todo[]> {
  return apiCall<Todo[]>(`/todos/?skip=${skip}&limit=${limit}`);
}

// Get a specific todo by ID
export async function getTodoById(id: number): Promise<Todo> {
  return apiCall<Todo>(`/todos/${id}`);
}

// Update a todo
export async function updateTodo(id: number, todo: TodoUpdate): Promise<Todo> {
  return apiCall<Todo>(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });
}

// Mark a todo as completed
export async function completeTodo(id: number): Promise<Todo> {
  return apiCall<Todo>(`/todos/${id}/complete`, {
    method: "PATCH",
  });
}

// Delete a todo
export async function deleteTodo(id: number): Promise<void> {
  await apiCall<void>(`/todos/${id}`, {
    method: "DELETE",
  });
}

// Export todos to text file
export async function exportTodos(): Promise<{ message: string; file_path: string; exported_count: number }> {
  return apiCall<{ message: string; file_path: string; exported_count: number }>(`/export/todos`);
}