import { BASE_URL } from './apiConfig';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      } else {
        return Promise.reject(response.status);
      }
    })
    .then((res) => {
      return res;
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response.status);
    })
    .then((data) => {
      return data;
    });
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => data);
};
