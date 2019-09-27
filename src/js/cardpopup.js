//Popup для ввода нового места
import Api from "./api";
import Card from "./card";
import {formEdit, serverUrl, newCardList} from "../index";
import Popup from "./popup";

export default class CardPopup extends Popup {
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
