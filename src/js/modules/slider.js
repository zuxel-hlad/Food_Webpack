function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  /* Slider */

  const slider = document.querySelector(container),
    sliderWrapper = document.querySelector(wrapper),
    sliderInner = document.querySelector(field),
    sliderItems = document.querySelectorAll(slide),
    // sliderCounter = document.querySelector(".offer__slider-counter"), /* old version slider */
    sliderCurrent = document.querySelector(currentCounter),
    sliderTotal = document.querySelector(totalCounter),
    sliderPrevBtn = document.querySelector(prevArrow),
    sliderNextBtn = document.querySelector(nextArrow),
    width = window.getComputedStyle(sliderWrapper)
      .width; /* slider wrapper size */
  // parsedWidth = parseInt(width); /* width in number type */

  /* slider v 2.0 */

  /* номер слайда по порядку */
  let slideIndex = 1;

  /* отступ при transform */
  let offset = 0;

  if (sliderItems.length < 10) {
    sliderTotal.textContent = `0${sliderItems.length}`;
    sliderCurrent.textContent = `0${slideIndex}`;
  } else {
    sliderTotal.textContent = sliderItems.length;
    sliderCurrent.textContent = slideIndex;
  }

  sliderInner.style.width = 100 * sliderItems.length + "%";
  sliderInner.style.display = "flex";
  sliderInner.style.transition = "0.8s all";

  sliderWrapper.style.overflow = "hidden";

  sliderItems.forEach((slide) => (slide.style.width = width));

  slider.style.position = "relative";

  /* Обертка для дотсов */
  const sliderDots = document.createElement("ol"),
    dots = [];
  sliderDots.classList.add("carousel-indicators");
  slider.append(sliderDots);

  for (let i = 0; i < sliderItems.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    /* каждой точке устанавливаем аттрибут и говорим к какому слайду относится. И устанавливаем нумерацию начиная с 1 */
    dot.setAttribute("data-slide-to", i + 1);
    if (i === 0) {
      dot.style.opacity = 1;
    }
    sliderDots.append(dot);
    dots.push(dot);
  }

  const addDotsOpacity = () => {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
    console.log( dots[slideIndex - 1])
  };

  const deleteNotDigets = (str) => {
    return +str.replace(/\D/g, "");
  };

  const checkSliderCurrent = () => {
    if (sliderItems.length < 10) {
      sliderCurrent.textContent = `0${slideIndex}`;
    } else {
      sliderCurrent.textContent = slideIndex;
    }
  };

  sliderNextBtn.addEventListener("click", () => {
    /* если последний слайд, то возвращаемся в начало */
    if (offset === deleteNotDigets(width) * (sliderItems.length - 1)) {
      offset = 0;
    } else {
      /* если не последний, то увеличиваем */
      offset += deleteNotDigets(width);
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === sliderItems.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    checkSliderCurrent();
    addDotsOpacity();
  });

  sliderPrevBtn.addEventListener("click", () => {
    /* если первый слайд */
    if (offset === 0) {
      /* возвращаемся в конец */
      offset = deleteNotDigets(width) * (sliderItems.length - 1);
    } else {
      offset -= deleteNotDigets(width);
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = sliderItems.length;
    } else {
      slideIndex--;
    }
    checkSliderCurrent();
    addDotsOpacity();
  });

  /* ручное переключение слайдов по клику на дотс */
  dots.forEach((dot) => {
    /* вешаем обработчик на каждую отдельную точку */
    dot.addEventListener("click", (e) => {
      const target = e.target;
      const slideTo = target.getAttribute("data-slide-to");
      /* записываем в слайд-индекс индекс точки на которую нажали */
      slideIndex = slideTo;
      offset = deleteNotDigets(width) * (slideTo - 1);
      sliderInner.style.transform = `translateX(-${offset}px)`;
      checkSliderCurrent();
      addDotsOpacity();
    });
  });

  /* slider_v 1.0 */

  // if (sliderItems.length < 10) {
  //   sliderTotal.textContent = `0${sliderItems.length}`;
  // } else {
  //   sliderTotal.textContent = sliderItems.length;
  // }

  // const showSlides = (n) => {
  //   if (n > sliderItems.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = sliderItems.length;
  //   }
  //   sliderItems.forEach((slide) => (slide.style.display = "none"));

  /* показать определенный слайд по индексу 0 */
  //   sliderItems[slideIndex - 1].style.display = "block";

  //   if (slideIndex < 10) {
  //     sliderCurrent.textContent = `0${slideIndex}`;
  //   } else {
  //     sliderCurrent.textContent = slideIndex;
  //   }
  // };

  // const plusIndex = (n) => {
  //   showSlides((slideIndex += n));
  // };

  // sliderCounter.addEventListener("click", (e) => {
  //   const target = e.target;
  //   if (target.classList.contains("offer__slider-prev")) {
  //     plusIndex(-1);
  //   }
  //   if (target.classList.contains("offer__slider-next")) {
  //     plusIndex(1);
  //   }
  // });

  // /* активация слайдера */
  // showSlides(slideIndex);
  // setInterval(() => {
  //   plusIndex(1);
  // }, 2000);
}

export default slider;
