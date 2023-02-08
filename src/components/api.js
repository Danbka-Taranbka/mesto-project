import { serverConfig } from './utils.js'

/*Всё, что связано с лайками, разрабатывается. Я всё ещё ничего не понимаю(((*/

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res
      .json()
      .then((err) => (API_ERROR_MESSAGE = err.message))
      .then(() =>
        Promise.reject({
          status: res.status,
          statusText: res.statusText,
        }),
      );
  }
};

export function getPromise() {
  return Promise.all([getProfileInfo(), getCards()]);
}

export function getProfileInfo() {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: serverConfig.headers,
    }).then(checkStatus)
}

export function editProfileInfo(name, profession) {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: serverConfig.headers,
      body: JSON.stringify({
        name: name,
        about: profession
      })
    }).then(checkStatus)
}

export function getCards() {
  return fetch(`${serverConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: serverConfig.headers,
    }).then(checkStatus);
};

export function addCard(name, link) {
  return fetch(`${serverConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: serverConfig.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(checkStatus)
}

export function deleteCard(cardId) {
  return fetch(`${serverConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: serverConfig.headers,
  }).then(checkStatus)

}

export function changeAvatar(avatar) {
  return fetch(`${serverConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: serverConfig.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(checkStatus)
}

export function getAvatar() {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: serverConfig.headers,
    }).then(checkStatus)
}

export function putLike(cardId) {
  return fetch(`${serverConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: serverConfig.headers,
  }).then(checkStatus)
}


export function deleteLike(cardId) {
  return fetch(`${serverConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: serverConfig.headers,
  }).then(checkStatus)
}


function getCardInfo(cardId) {
  return fetch(`${serverConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: serverConfig.headers,
    }).then(checkStatus)
    .then((data) => {
      let cardLikes = data.find(card => card._id === cardId).likes;
      return cardLikes;
    })
}

getCardInfo('63e2cb5f79c1d903fc2038ae');
  