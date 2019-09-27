//Popup для редактирования данных пользователя
import Api from "./api";
import {formEditProfile, userInfoName, userInfoJob, serverUrl} from '../index';
import Popup from "./popup";

export default class FormPopup extends Popup {
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