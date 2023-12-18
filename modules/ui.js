function showSublist(elem) {
  elem.removeClass("nav__sublist");
  elem.addClass("nav__sublist--hover-visible");
}

function hideSublist(elem) {
  elem.addClass("nav__sublist");
  elem.removeClass("nav__sublist--hover-visible");
}

export { showSublist, hideSublist };
