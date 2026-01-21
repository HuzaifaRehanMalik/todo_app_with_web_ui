const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://huzaifa035-backend.hf.space/api/v1";

/**
 * Simple localStorage-based auth helper
 */
export const tokenStorage = {
  setToken(token: string) {
    localStorage.setItem("access_token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("access_token");
  },

  removeToken() {
    localStorage.removeItem("access_token");
  },

  setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser(): any {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  },

  removeUser() {
    localStorage.removeItem("user");
  },

  // ✅ REQUIRED by todo/page.tsx
  clear() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
};

/**
 * Generic JSON request helper
 */
async function request<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data: any = {};
  try {
    data = await res.json();
  } catch {
    // ignore empty responses
  }

  if (!res.ok) {
    // FastAPI usually returns { detail: "..." }
    const message = data?.detail || data?.message || "Request failed";
    throw new Error(message);
  }

  return data as T;
}

/**
 * Auth APIs
 */
export async function signIn(payload: {
  email: string;
  password: string;
}) {
  return request<{
    access_token: string;
    user: any;
  }>("/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function signUp(payload: {
  email: string;
  password: string;
}) {
  return request<{
    access_token: string;
    user: any;
  }>("/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
