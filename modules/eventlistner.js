import { showSublist, hideSublist } from "./ui.js";

function setupHoverNav() {
  $(".nav__item").hover(
    function () {
      const sublist = $(this).find(".nav__sublist");
      showSublist(sublist);
    },
    function () {
      const sublist = $(this).find(".nav__sublist--hover-visible");
      hideSublist(sublist);
    }
  );
}

export { setupHoverNav };
