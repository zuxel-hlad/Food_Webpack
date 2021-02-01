/* Timer */

function timer(timerClass, deadline) {
  /* оРасчет временных промежутков */
  const getTimeRemaining = (endtime) => {
    /*  в переменную t получаем разницу между датами */
    const t = Date.parse(endtime) - Date.parse(new Date()),
      /* получаем количество дней до дедлайна */
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      /* получаем количество часов до дедлайна */
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      /* получаем количество минут до дедлайна */
      minutes = Math.floor((t / 1000 / 60) % 60),
      /* получаем количество сукунд до дедлайна */
      seconds = Math.floor((t / 1000) % 60);

    /* возвращаем наружу данные вычислений */
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  /*  если дата и время меньше 10 то вписываем впереди 0 */
  const getZero = (num) => {
    /* проверяем какое пришло число */
    /*  если число не двухзначное, добавляем впред 0 */
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  /* устанавливаем дату и время на страницу */
  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    /* функция обновляющая время каждую секунду */
    function updateClock() {
      /* расчет времени которое осталось прямо на эту секунду */
      const t = getTimeRemaining(endtime);

      /* количество дней которое нужно отобразить на странице */
      days.innerHTML = getZero(t.days);

      /* количество часов которое нужно отобразить на странице */
      hours.innerHTML = getZero(t.hours);

      /* количество минут которое нужно отобразить на странице */
      minutes.innerHTML = getZero(t.minutes);

      /* количество секунд которое нужно отобразить на странице */
      seconds.innerHTML = getZero(t.seconds);

      /* если суммарное время больше дедлайна то стоп интервал */
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };
  setClock(timerClass, deadline);
}

export default timer;
