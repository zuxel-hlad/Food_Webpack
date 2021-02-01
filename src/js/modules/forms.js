import { closeModal, showModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  // Forms

  const forms = document.querySelectorAll(formSelector);

  /* хранилище сообщений на случай ошибки и успеха */
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  /* Навешиваем обработчик каждой форме */
  forms.forEach((item) => {
    bindPostData(item);
  });

  /* ф-ция привязки отправки данных из формы */
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); /* cancel standart function button */

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.classList.add("order__status-message");
      form.insertAdjacentElement("beforeend", statusMessage);

      /* Собираем данные из формы */
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      /* Отправляем на сервер */
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  /* ф-ция благодарности за отправку данных из формы */
  function showThanksModal(message) {
    /* получение модального диалога */
    const prevModalDialog = document.querySelector(".modal__dialog");

    /* прячем до вызова показа модалки */
    prevModalDialog.classList.add("hide");
    showModal(".modal", modalTimerId);

    /* наполняем контентом окно */
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
  <div class="modal__content">
  <div class="modal__close" data-close>×</div>
  <div class="modal__title">${message}</div>
  </div>
  `;

    /* добавляем контент в модальное окно после отправки */
    document.querySelector(".modal").append(thanksModal);

    /* закрытие благодарственного модального окна вместе с содержимым и контентом */
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
}
export default forms;
