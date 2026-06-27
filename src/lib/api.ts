const API_BASE = '';

function getToken() {
  return localStorage.getItem('flowinvoice_token');
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function api<T>(path: string, options: RequestInit & { isForm?: boolean } = {}): Promise<T> {
  const { isForm, ...init } = options;
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string>),
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isForm && init.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(json.error || res.statusText || 'Request failed', res.status);
  }

  return (json.data ?? json) as T;
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem('flowinvoice_token', token);
  else localStorage.removeItem('flowinvoice_token');
}
