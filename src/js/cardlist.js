//Хранит и отрисовывает карточки
import Api from "./api";
import Card from "./card";
import ImagePopup from "./imagepopup";
import {placesList, serverUrl} from '../index';

export default class CardList {
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
