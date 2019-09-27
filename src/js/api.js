

export default class Api {
    constructor(callback, baseURL, method,  authorization, type) {
    this.callback= callback;
    this.baseURL = baseURL;
    this.method = method;
    this.authorization = authorization;
    this.type = type;
    } 
    //Запросы на загрузку начальных карточек и информации о пользователе
    createRequest () {
      return fetch (`${this.baseURL}`, this.methodHeaders())
      .then(this.waitResult(this.res))
      .then(data => this.callback (data))
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
    }
    //Запросы на изменение информации о пользователе
    createRequestProfile (name, profession) {
      this.name = name;
      this.profession = profession;
      return fetch (`${this.baseURL}`, {
         method: `${this.method}`,
         headers: this.headers(),
         body: JSON.stringify ({
              name: `${this.name}`,
              about: `${this.profession}`
             })
      })
      .then(this.waitResult(this.res))
      .then(data => this.callback (data))
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
    }
    //Запросы о вводе нового места
    createRequestExtraCard (place, link) {
    this.place = place;
    this.link = link;
      return fetch (`${this.baseURL}`, {
         method: `${this.method}`,
         headers: this.headers(),
         body: JSON.stringify ({
              name: `${this.place}`,
              link: `${this.link}`
             })
      })
      .then(this.waitResult(this.res))
      .then(data => this.callback (data))
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
    }

    waitResult(_res) {
      return (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      };
    }
    headers() {
      return {
        authorization: `${this.authorization}`,
        'Content-Type': `${this.type}`
      };
    }
    methodHeaders() {
      return {
        method: `${this.method}`,
        headers: this.headers(),
      };
    }
  }