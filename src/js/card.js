//Создает карточку

export default class Card {
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