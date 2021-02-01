/* ф-ция закрытия модалки */
const closeModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
};

/* ф-ция открытия модалки */
const showModal = (modalSelector, modalTimerId) => {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("show", "fade");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
};

// Modal module

function modal(triggerSelector, modalSelector, modalTimerId) {
  /* Получаю со страницы */
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  /* открытие модалки  */
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => showModal(modalSelector, modalTimerId));
  });

  /*   закрыть модалку если кликаем мимо формы */
  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (target === modal || target.getAttribute("data-close") === "") {
      closeModal(modalSelector);
    }
  });

  /*   закрыть модалку если нажимаем escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  /* ф-ция открытия модалки во время скролла*/
  /* ф-ция удаления открытия модалки при долистывании до конца страницы*/
  const showModalByScroll = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  /* отследить скролл для показа модалки в конце страницы */
  window.addEventListener("scroll", showModalByScroll);

  // Modal window END
}

export default modal;

export { closeModal };
export { showModal };
