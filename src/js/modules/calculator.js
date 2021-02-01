function calculator() {
  // Calculator

  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  const initLocalSettings = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      el.classList.remove(activeClass);

      if (el.getAttribute("id") === localStorage.getItem("sex")) {
        el.classList.add(activeClass);
      }
      if (el.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        el.classList.add(activeClass);
      }
    });
  };
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "0";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  };
  calcTotal();

  const getStaticInformation = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) =>
      elem.addEventListener("click", (e) => {
        const target = e.target;

        if (target.getAttribute("data-ratio")) {
          ratio = +target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +target.getAttribute("data-ratio"));
        } else {
          sex = target.getAttribute("id");
          localStorage.setItem("sex", target.getAttribute("id"));
        }

        elements.forEach((el) => el.classList.remove(activeClass));
        target.classList.add(activeClass);
        calcTotal();
      })
    );
  };
  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  const getDynamicInformation = (selector) => {
    const input = document.querySelector(selector);
    input.addEventListener("input", (e) => {
      const target = e.target;
      if (input.value.match(/\D/g)) {
        input.style.boxShadow = "0px 4px 15px rgb(255 0 0)";
      } else {
        input.style.boxShadow = "";
      }
      if (target.getAttribute("id") === "height") {
        height = +input.value;
      }
      if (target.getAttribute("id") === "weight") {
        weight = +input.value;
      }
      if (target.getAttribute("id") === "age") {
        age = +input.value;
      }
      // switch (input.getAttribute("id")) {
      //   case "height":
      //     height = +input.value;
      //     break;
      //   case "weight":
      //     weight = +input.value;
      //     break;
      //   case "age":
      //     age = +input.value;
      //     break;
      // }
      calcTotal();
    });
  };
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");

  /* Slow scroll */

  const btnUp = document.querySelector(".up");
  window.addEventListener("scroll", () => {
    if (pageYOffset > 800) {
      btnUp.classList.remove("hide");
      btnUp.classList.add("show");
    } else {
      btnUp.classList.remove("show");
      btnUp.classList.add("hide");
    }
  });
}

export default calculator;
