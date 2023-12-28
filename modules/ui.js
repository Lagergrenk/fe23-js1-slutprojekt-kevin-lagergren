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

export function displaySearchResults(movies, actors, tv) {
  $mainContent.empty();

  const $searchResults = createElemAndAppend(
    "div",
    "main__search-results",
    $mainContent
  );
  //Display movies
  const $movieResults = createElemAndAppend(
    "div",
    "main__movie-results",
    $searchResults
  );
  createElemAndAppend("h2", "main__title", $movieResults).text("Movies");
  createElemAndAppend("div", "main__movie-total", $movieResults).text(
    `Totalt found: ${movies.length}`
  );

  //Display actors
  const $actorResults = createElemAndAppend(
    "div",
    "main__actor-results",
    $searchResults
  );
  createElemAndAppend("h2", "main__title", $actorResults).text("Actors");
  createElemAndAppend("div", "main__actor-total", $actorResults).text(
    `Total found: ${actors.length}`
  );

  //Display tv shows
  const $tvResults = createElemAndAppend(
    "div",
    "main__tv-results",
    $searchResults
  );
  createElemAndAppend("h2", "main__title", $tvResults).text("TV Shows");
  createElemAndAppend("div", "main__tv-total", $tvResults).text(
    `Total found: ${tv.length}`
  );
}
