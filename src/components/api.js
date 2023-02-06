import { profileName, profileProfession, avatarImage } from './index.js'
import { prependNewElement } from './card.js'

export function getProfileInfo() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me', {
    method: 'GET',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((data) => {
        profileName.textContent = data.name;
        profileProfession.textContent = data.about;
      })
      .catch((err) => {
        console.log(err);
      })
}

export function editProfileInfo(name, profession) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me', {
    method: 'PATCH',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: profession
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(getProfileInfo)
    .catch((err) => {
      console.log(err);
    })
}

export function getCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/cards', {
    method: 'GET',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((data) => {
        data.forEach((element) => {
          prependNewElement(element.link, element.name)
        })
      })
      .catch((err) => {
        console.log(err);
      })
}

export function addCard(name, link) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/cards', {
    method: 'POST',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
}

export function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-19/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

export function changeAvatar(avatar) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me/avatar', {
    method: 'PATCH',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(getAvatar)
    .catch((err) => {
      console.log(err);
    })
}

export function getAvatar() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me', {
    method: 'GET',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      avatarImage.setAttribute('src', data.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
}

export function getInfo() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/cards', {
    method: 'GET',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i = 0; i <= data.length; i++) {
       if (data[i].owner._id === '771e35463dd953c4f4ef4881') {
        console.log(data[i]);
       }
      }
      
    })
}

getInfo();

