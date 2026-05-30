import { loadFromStorage } from "./storage";

const API_BASE_URL = import.meta.env.VITE_API_URL ||"http://localhost:5000";

export type AuthenticatedUser = {
  id: string;
  name?: string | null;
  email: string;
};

export type AuthResponse = {
  success: boolean;
  token: string;
  user: AuthenticatedUser;
  message?: string;
};

export const getAuthToken = () => loadFromStorage<string | null>("authToken", null);

export const apiFetch = (path: string, init: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });
};

export const getCurrentAuthUser = async () => {
  const response = await apiFetch("/auth/me");

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  const data = (await response.json()) as {
    success: boolean;
    user: AuthenticatedUser;
  };

  return data.user;
};

export const registerAccount = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = (await response.json()) as AuthResponse;

  if (!response.ok) {
    throw new Error(data.message || "Failed to create account");
  }

  return data;
};

export const loginWithPassword = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = (await response.json()) as AuthResponse;

  if (!response.ok) {
    throw new Error(data.message || "Failed to log in");
  }

  return data;
};
