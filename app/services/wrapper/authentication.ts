'use client';

const BASE_URL = 'https://api.swasthyapro.com/api';

let refreshPromise: Promise<any> | null = null;

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

export const apiFetch = async <T = any> (
  endpoint: string,
  options: RequestInit = {},
  retry = true
): Promise<T> => {
  let token = localStorage.getItem('accessToken');

  if (!token) {
    const res = await refreshAccessToken();
    const data = await res.json();
    token = data?.accessToken ?? data?.data?.accessToken;
    if (!token) throw new Error('Session expired');
    localStorage.setItem('accessToken', token);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (res.status === 401 && retry) {
    const refreshRes = await refreshAccessToken();
    const data = await refreshRes.json();
    const newToken = data?.accessToken ?? data?.data?.accessToken;

    if (!newToken) throw new Error('Session expired');
    localStorage.setItem('accessToken', newToken);

    return apiFetch(endpoint, options, false);
  }

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
};
