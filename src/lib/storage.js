let inMemoryToken = null;

export function setToken(token) {
  inMemoryToken = token || null;
  try {
    if (token) {
      localStorage.setItem('md_token', token);
    } else {
      localStorage.removeItem('md_token');
    }
  } catch (_) {
    // ignore storage errors
  }
}

export function getToken() {
  if (inMemoryToken) return inMemoryToken;
  try {
    const t = localStorage.getItem('md_token');
    inMemoryToken = t;
    return t;
  } catch (_) {
    return null;
  }
}

export function clearToken() {
  inMemoryToken = null;
  try {
    localStorage.removeItem('md_token');
  } catch (_) {}
}
