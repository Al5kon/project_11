//{
  import "./pages/style.css";

  /* Переменные */
  const  placesList = document.querySelector(".places-list");
  const formEdit = document.forms.newplace;
  const formEditProfile = document.forms.newprofile;
  const userInfoName = document.querySelector(".user-info__name");
  const userInfoJob = document.querySelector(".user-info__job");
  const userInfoAvatar = document.querySelector(".user-info__photo");
  const bigPictureCloseButton = document.querySelector(".bigpicture__close");
  const bigPicture = document.querySelector(".bigpicture");
  const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';
  
  // Запросы

  class Api {
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

  //Класс, хранящий и отрисовывающий карточки
  class CardList {
    constructor() {
      this.render = this.render.bind(this);
      this.load();
      this.addlistener();
    }
    //Отправляет запрос на загрузку начальных карточек
    load () {
      new Api(this.render, `${serverUrl}/cards`, 'GET',
      '3004026e-6e54-422c-bbcd-d371103b5597', 'application/json').createRequest ();
    }

    //Перебирает исходный массив с параметрами карточек
    render(data) {
      this.arr = data;
      this.arr.forEach(item => {
        this.addCard(new Card().create(), item.link, item.name);
      });
    }

    //Отрисовывает карточку
    addCard(domElement, link, name) {
      placesList.insertAdjacentHTML("beforeEnd", domElement);
      const nodata = document.querySelector(".nodata");
      nodata.querySelector(".place-card__image").style.backgroundImage =
        "url(" + link + ")";
      nodata.querySelector("h3").textContent = name;
      nodata.classList.remove("nodata");
    }

    //Убирает карточку
    remove(element) {
      placesList.removeChild(element.parentElement.parentElement);
    }

    //Слушает карточки
    addlistener() {
      placesList.addEventListener("click", event => {
        this.element = event.target;
        if (this.element.classList.contains("place-card__delete-icon")) {
          this.remove(this.element);
        }
        if (this.element.classList.contains("place-card__like-icon")) {
          Card.moveLike(this.element);
        }
        if (this.element.classList.contains("place-card__image")) {
          new ImagePopup(this.element).show(this.element);
        }
      });
    }
  }

  //Класс, создающий карточку
  class Card {
    //Создает DOM элемент карточки и возвращает для отрисовки
    create() {
       return this.domElement = `<div class='place-card nodata'>
        <div class='place-card__image'>
        <button class='place-card__delete-icon'></button>
        </div>
        <div class='place-card__description'>
        <h3 class='place-card__name noname'></h3>
        <button class='place-card__like-icon'></button>
        </div>
        </div>`;
    }

    //Ставит и убирает лайки на карточке
    static moveLike(element) {
      this.element = element;
      this.element.classList.toggle("place-card__like-icon_liked");
    }
  }  

  //Вызывает popup с формой
  class Button {
  
  click (element) {
    this.element = element;
    if (this.element.classList.contains("user-info__button")) {
      this.element = document.querySelector("#info");
      new CardPopup(this.element).open();
    }
    if (this.element.classList.contains("user-info__edit")) {
      this.element = document.querySelector("#profile");
      new FormPopup(this.element).open();
    }
  }
  }

  //Родительский класс popup
  class Popup {
    constructor (element) {
      this.element = element;
    }

    //Загружает popup
    open () {
      this.element.classList.add("popup_is-opened");
      const popupButton = this.element.querySelector(".button");
      popupButton.disabled = true;
      this.addListener();
      this.popupListen();
    }
    //Убирает popup
    close(element) {
      element.classList.remove("popup_is-opened");
      const param = ["place", "link", "name", "profession"];
      for (let value of param) {
        document.querySelector(`#error-${value}`).textContent = "";
        document
          .querySelector(`#error-${value}`)
          .classList.remove("popup__invalid-message");
      }
    }
    //Слушает крестик у popup
    addListener () {
      document.addEventListener("click", event => {
        this.element = event.target;
        if (this.element.classList.contains("popup__close")) {
          this.element = this.element.closest(".popup");
          this.close(this.element);
        }
      });
    }
  }

  //Класс popup для ввода нового места
  class CardPopup extends Popup {
    constructor (element) {
      super ();
      this.element = element;
    }

    //Открывает popup
    open () {
      super.open();
      this.element.querySelector(".popup__input_type_name").value = "";
      this.element.querySelector(".popup__input_type_link-url").value = "";
    }

    // Обрабатывает событие на кнопке формы с новым местом
    addUserCard(event) {
      event.preventDefault();
      const form = event.currentTarget;
      this.link = form.elements.link;
      this.place = form.elements.place;
      this.sendNewPlace(this.link.value, this.place.value);
      this.elem = document.querySelector("#info");
      form.reset();
      super.close(this.elem);
    }
    //Отправляет информацию о новом месте
    sendNewPlace (link, place) {
      this.link = link;
      this.place = place;
      /*new Api(this.drawNewCard, 'http://95.216.175.5/cohort2/cards', 'POST','3004026e-6e54-422c-bbcd-d371103b5597','application/json')
        .createRequestExtraCard( this.place, this.link);*/
        new Api(this.drawNewCard, `${serverUrl}/cards`, 'POST','3004026e-6e54-422c-bbcd-d371103b5597','application/json')
        .createRequestExtraCard( this.place, this.link);
    }
    //Отрабатывает полученную от сервер информацию о новом месте
    drawNewCard (data) {
      newCardList.addCard(new Card().create(), data.link, data.name);
    }

    //Слушают события на popup
    popupListen() {
      formEdit.addEventListener("submit", this.addUserCard.bind(this));
    }
  }

  //Класс popup для редактирования данных пользователя
  class FormPopup extends Popup {
    constructor (element) {
      super ();
      this.element = element;
    }

    //Открывает popup
    open () {
      super.open();
      this.element.querySelector(".popup__input_type_name").value =
        userInfoName.textContent;
      this.element.querySelector(".popup__input_type_link-url").value =
        userInfoJob.textContent;
    }

    //Обрабатывает событие на кнопке формы, редактирующей профиль пользователя
    addChangeProfile(event) {
      event.preventDefault();
      const form = event.currentTarget;
      const professionUser = form.elements.profession;
      const nameUser = form.elements.name;
      this.sendEditProfile(nameUser.value, professionUser.value);
      this.elem = document.querySelector("#profile");
      super.close(this.elem);
    }
    //Отправляет запрос с изменениями в профиле пользователя
    sendEditProfile (name, profession) {
      this.name = name;
      this.profession = profession;
      /*new Api(this.drawEditProfile, 'http://95.216.175.5/cohort2/users/me', 'PATCH','3004026e-6e54-422c-bbcd-d371103b5597',
      'application/json').createRequestProfile( this.name, this.profession);*/
      new Api(this.drawEditProfile, `${serverUrl}/users/me`, 'PATCH','3004026e-6e54-422c-bbcd-d371103b5597',
      'application/json').createRequestProfile( this.name, this.profession);
    }
    //Принимает от сервера информацию с изменениями в профиле пользователя
    drawEditProfile (data) {
      this.data = data;
      userInfoName.textContent = this.data.name;
      userInfoJob.textContent = this.data.about;
    }
    
    //Слушают события на popup
    popupListen() {
      formEditProfile.addEventListener("submit", this.addChangeProfile.bind(this));
    }
  }

  //Класс для большой картинки
  class ImagePopup {
    constructor(element) {
      this.element = element;
      this.addListener();
    }

    //Показывает большую картинку
    show(element) {
      this.element = element;
      bigPicture.classList.add("bigpicture_is-opened");
      document.querySelector(".bigpicture__image").src =
        this.element.style.backgroundImage.slice(5, -2);
    }

    // Убирает большую картинку
    close() {
      bigPicture.classList.remove("bigpicture_is-opened");
    }

    //Слушает события на большой картинке
    addListener() {
      bigPictureCloseButton.addEventListener("click", this.close);
    }
  }

  //Слушаeт кнопки для вызова popup и закрывающий его селектор
  document.addEventListener("click", event => {
    new Button().click(event.target);
  });

  //Отрисовывает начальную информацию о пользователе
  function editUserData (data) {
    userInfoName.textContent = data.name;
    userInfoJob.textContent = data.about;
    userInfoAvatar.style.backgroundImage =
    "url(" + data.avatar + ")";
  }

  //Запрашивает начальную информацию о пользователе
  new Api(editUserData, `${serverUrl}/users/me`, 'GET',
  '3004026e-6e54-422c-bbcd-d371103b5597', 'application/json').createRequest ();
  
  //Создает объект
  const newCardList = new CardList();
//}
