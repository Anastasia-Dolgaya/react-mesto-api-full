import { apiConfig } from './apiConfig';

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  fetchUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  fetchInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  updateUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  fetchCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  fetchLikes(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  signout() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }
}

const api = new Api(apiConfig);
export { Api, api };
