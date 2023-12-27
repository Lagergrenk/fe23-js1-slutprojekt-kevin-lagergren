import { createElemAndAppend, createCardAndAppend } from "./utils.js";

//Global Variables
const $mainContent = $(".main__content");
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export function showSublist(elem) {
  elem.removeClass("nav__sublist");
  elem.addClass("nav__sublist--hover-visible");
}

export function hideSublist(elem) {
  elem.addClass("nav__sublist");
  elem.removeClass("nav__sublist--hover-visible");
}
//
export function displayItemList(items, itemType, parentSelector, type) {
  const $parent = $(parentSelector);
  $parent.empty();
  const $title = createElemAndAppend("h2", "main__title", $parent);
  $title.text(itemType.toUpperCase());
  const $itemList = createElemAndAppend(
    "div",
    `main__${itemType}-list`,
    parentSelector
  );
  const slicedItems = items.slice(0, 10);

  slicedItems.forEach((item) => {
    createCardAndAppend($itemList, item, type, IMAGE_URL);
  });
}
export function displayMovie() {
  //Image
  //title
  //release date
  //overview
}

export function displayActor() {
  //Image
  //name
  //Known for
  //list of movies and tv shows
}
