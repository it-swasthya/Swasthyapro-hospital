'use client';

const BASE_URL = 'https://api.swasthyapro.com/api';

export const refreshToken = async () => {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Refresh token failed');
  }

  return res.json();
};

export const fetchProtectedData = async (
  url: string,
  retry = true
): Promise<any> => {
  let accessToken = localStorage.getItem('accessToken');

  // 🔁 Try refresh if token missing
  if (!accessToken) {
    const refreshed = await refreshToken();
    accessToken = refreshed?.accessToken;

    if (!accessToken) {
      throw new Error('Session expired');
    }

    localStorage.setItem('accessToken', accessToken);
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  // 🔄 Token expired
  if (res.status === 401 && retry) {
    const refreshed = await refreshToken();

    const newToken = refreshed?.accessToken;
    if (!newToken) {
      throw new Error('Session expired');
    }

    localStorage.setItem('accessToken', newToken);

    return fetchProtectedData(url, false); // ⛔ retry only once
  }

  if (res.status === 404) {
    throw new Error('Not found');
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};
