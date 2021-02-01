function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  /* Tabs */
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);
  /* сделать табы и их содержимое не активными  */
  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => item.classList.remove(activeClass));
  };

  /* сделать табы и их содержимое активными  */
  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  };

  hideTabContent();
  showTabContent();
  /*
по нажатию на таб, сделать его активным и показать содержимое */
  tabsParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains(tabsSelector.replace(/\./, ""))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;
