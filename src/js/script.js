"use strict";

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import forms from "./modules/forms";
import cards from "./modules/cards";
import slider from "./modules/slider";
import calculator from "./modules/calculator";
import jQuery from "./modules/jQuery";
import btnUp from "./modules/btnUp";
import { showModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  /* показать модалку через время как зашел на страницу */
  const modalTimerId = setTimeout(
    () => showModal(".modal", modalTimerId),
    50000
  );
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  timer(".timer", "2021-03-01");
  modal("[data-modal]", ".modal", modalTimerId);
  forms("form", modalTimerId);
  cards();
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  calculator();
  jQuery();
  btnUp();
});
