'use client';

const BASE_URL = 'https://api.swasthyapro.com/api';

export const refreshToken = async () => {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  console.log(res, "refresh token api working or not ");

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

  console.log(accessToken, "accessToken ");

  //  Try refresh if token missing
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

 
  if (res.status === 401 && retry) {
    const refreshed = await refreshToken();

    console.log(refreshToken, "refresh token attached or not ? ");

    const newToken = refreshed?.accessToken;
    if (!newToken) {
      throw new Error('Session expired');
    }

    localStorage.setItem('accessToken', newToken);

    return fetchProtectedData(url, true); 
  }

  if (res.status === 404) {
    throw new Error('Not found');
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};
