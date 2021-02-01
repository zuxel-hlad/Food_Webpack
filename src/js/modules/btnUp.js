function btnUp() {
  /* jQuery script for scroll */
  $(document).ready(function () {
    $(function () {
      $("a[href='#header']").click(function () {
        var _href = $(this).attr("href");
        $("html, body").animate(
          { scrollTop: $(_href).offset().top + "px" },
          { duration: 900 }
        );
        return false;
      });
    });
  });
}

export default btnUp;
