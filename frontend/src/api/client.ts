export type ApiUser = { id: string; role: 'donor' | 'collector' | 'admin'; name?: string; email?: string };

const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:4000/api';

function getToken(): string | null { return localStorage.getItem('token'); }
function setToken(token: string | null) {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

async function request(path: string, init: RequestInit = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init.headers as any) };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || `HTTP ${res.status}`);
  return res.json();
}

export const api = {
  get: <T = any>(path: string) => request(path) as Promise<T>,
  post: <T = any>(path: string, body?: any) => request(path, { method: 'POST', body: JSON.stringify(body || {}) }) as Promise<T>,
  patch: <T = any>(path: string, body?: any) => request(path, { method: 'PATCH', body: JSON.stringify(body || {}) }) as Promise<T>,
  put: <T = any>(path: string, body?: any) => request(path, { method: 'PUT', body: JSON.stringify(body || {}) }) as Promise<T>,
  delete: <T = any>(path: string) => request(path, { method: 'DELETE' }) as Promise<T>,
  multipart: async <T = any>(path: string, form: FormData, method: 'POST' | 'PUT' = 'POST') => {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, { method, body: form, headers });
    if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || `HTTP ${res.status}`);
    return res.json() as Promise<T>;
  },
  auth: {
    async me(): Promise<{ user: ApiUser | null }> { return request('/auth/me'); },
    async login(email: string, password: string) { return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); },
    async register(name: string, email: string, password: string, role: 'donor'|'collector') { return request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, role }) }); },
    setToken,
  },
  public: { stats: () => request('/public/stats') },
};
