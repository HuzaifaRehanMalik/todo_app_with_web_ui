"use client";

import { UserLogin, UserCreate, AuthResponse, UserPublic } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://huzaifa035-backend.hf.space";

// Generic API call function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

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
      console.error(`API Error (${url}): Expected JSON but got ${contentType}`, text.substring(0, 200));
      throw new Error(`API Error: Received invalid response from server. Status: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Handle network errors (backend not running, CORS, etc.)
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Failed to connect to the server. Please check your internet connection and make sure the backend is reachable.`
      );
    }
    // Re-throw other errors
    throw error;
  }
}

// Sign in (login) user
export async function signIn(credentials: UserLogin): Promise<AuthResponse> {
  return apiCall<AuthResponse>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// Sign up (register) user
export async function signUp(userData: UserCreate): Promise<UserPublic> {
  return apiCall<UserPublic>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// Token management utilities
export const tokenStorage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", token);
  },

  removeToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
  },

  getUser: (): UserPublic | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser: (user: UserPublic): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
};
