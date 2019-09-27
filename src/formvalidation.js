{
  //Валидация форм
  //Переменные
 const linkInput = document.querySelector("#link");

class Form {
  
  //Функция проверки Input
  checkInput(element) {
    const inputError = document.querySelector(`#error-${element.id}`);
    inputError.textContent = "";
    inputError.classList.remove("popup__invalid-message");
    if (element.validity.valueMissing) {
      inputError.textContent =
        "Это обязательное поле";
    } else if (element.id !== linkInput.id) {
      if (element.validity.tooShort) {
        inputError.textContent =
          "Должно быть от 2 до 30 символов";
      }
    } else if (element.validity.typeMismatch) {
      inputError.textContent =
        "Здесь должна быть ссылка";
    }
    inputError.classList.add("popup__invalid-message");
    this.toActivateButton(element);
  }

  //Функция активации кнопки формы
  toActivateButton(element) {
    const inputs = Array.from(
      element.parentElement.querySelectorAll("input")
    );
    function noMissing(elem) {
      if (!elem.validity.valueMissing) {
        if (elem.id !== linkInput.id) {
          return !elem.validity.tooShort;
        } else {
          return !elem.validity.typeMismatch;
        }
      }
    }
    const button_black = event.target.parentElement.querySelector(".button");
    if (inputs.every(noMissing)) {
      button_black.classList.add("button_black");
      button_black.disabled = false;
    } else {
      button_black.classList.remove("button_black");
      button_black.disabled = true;
    }
  }
}

  //Слушатель
  document.addEventListener("input", event => {
    new Form().checkInput(event.target);
  });
}
