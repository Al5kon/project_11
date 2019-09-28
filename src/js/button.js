//Вызывает popup с формой
import CardPopup from "./cardpopup";
import FormPopup from "./formpopup";

export default class Button {
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