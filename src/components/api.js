import { profileName, profileProfession} from './index.js'
import { prependNewElement } from './card.js'

export function getProfileInfo() {
  fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me', {
    method: 'GET',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        profileName.textContent = data.name;
        profileProfession.textContent = data.about;
      })
}

export function editProfileInfo(name, profession) {
  fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me', {
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
      return res.json();
    })
    .finally(getProfileInfo)
}

export function getCards() {
  fetch('https://nomoreparties.co/v1/plus-cohort-19/cards', {
    method: 'GET',
    headers: {
        authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((element) => {
          prependNewElement(element.link, element.name)
        })
      })
}

export function addCard(name, link) {
  fetch('https://nomoreparties.co/v1/plus-cohort-19/cards', {
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
        return res.json();
      })
}