//Большая картинка
import {bigPicture, bigPictureCloseButton} from "../index";

export default class ImagePopup {
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