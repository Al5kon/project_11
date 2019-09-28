//Родительский класс popup
export default class Popup {
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