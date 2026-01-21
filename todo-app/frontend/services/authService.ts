import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://<your-space>.hf.space/api/v1";

export const tokenStorage = {
  setToken(token: string) {
    localStorage.setItem("access_token", token);
  },
  getToken() {
    return localStorage.getItem("access_token");
  },
  removeToken() {
    localStorage.removeItem("access_token");
  },
  setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser() {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  },
  removeUser() {
    localStorage.removeItem("user");
  },
};

export async function signIn(payload: { email: string; password: string }) {
  const res = await axios.post(`${API_BASE_URL}/signin`, payload);
  return res.data; // must include access_token + user
}

export async function signUp(payload: { email: string; password: string }) {
  const res = await axios.post(`${API_BASE_URL}/signup`, payload);
  return res.data;
}
