
  import "./pages/style.css";

  import Api from './js/api';
  import Button from "./js/button";
  import CardList from './js/cardlist';
  import Form from "./js/formvalidation";

  /* Переменные */
  export const  placesList = document.querySelector(".places-list");
  export const formEdit = document.forms.newplace;
  export const formEditProfile = document.forms.newprofile;
  export const userInfoName = document.querySelector(".user-info__name");
  export const userInfoJob = document.querySelector(".user-info__job");
  export const userInfoAvatar = document.querySelector(".user-info__photo");
  export const bigPictureCloseButton = document.querySelector(".bigpicture__close");
  export const bigPicture = document.querySelector(".bigpicture");
  export const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';
  

  //Слушаeт кнопки для вызова popup и закрывающий его селектор
  document.addEventListener("click", event => {
    new Button().click(event.target);
  });
  //Слушатель валидации
  document.addEventListener("input", event => {
    new Form().checkInput(event.target);
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
  export const newCardList = new CardList();
