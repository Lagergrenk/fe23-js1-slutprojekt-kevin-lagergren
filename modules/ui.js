/*
TODO:
  - if the user clicks on a movie/tv show/person, display the details of that item or list of items
  - if any results are lenght 0, do not display section of that type
  - if any results are undefined, do not display section of that type
  - create  function for displaying the details of 1 item. more indepth than the card
  

 */

import * as utils from "./utils.js";

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
// Display the list of items in cards in the main content
// items: array of items to display
export function displayItemList(items, itemType, parentSelector, type, title) {
  const $parent = $(parentSelector);
  $parent.empty();
  const $title = utils.createElemAndAppend("h2", "main__title", $parent);
  if (title) {
    $title.text(title);
  }
  const $itemList = utils.createElemAndAppend(
    "div",
    `main__${itemType}-list`,
    parentSelector
  );
  const slicedItems = items.slice(0, 10);
  slicedItems.forEach((item) => {
    const $card = utils.createCardAndAppend($itemList, item, type, IMAGE_URL);
    const $cardImg = $card.find(".card-img-top");
    MovieTvOrPerson($card, $cardImg, item, type, IMAGE_URL);
  });
}

export function displaySearchResults(movies, persons, tv) {
  $mainContent.empty();

  if (
    !utils.isPopulatedArray(movies) &&
    !utils.isPopulatedArray(persons) &&
    !utils.isPopulatedArray(tv)
  ) {
    utils
      .createElemAndAppend("h2", "main__title", $mainContent)
      .text("No results found");
    return;
  }

  const $searchResults = utils.createElemAndAppend(
    "div",
    "main__search-results",
    $mainContent
  );

  displayCategoryResults("Movies", "movie", movies, $searchResults);
  displayCategoryResults("Persons", "person", persons, $searchResults);
  displayCategoryResults("Tv-Shows", "tv", tv, $searchResults);
}

//------------------ Helper functions ------------------//

function displayCategoryResults(title, categoryName, data, $parentElement) {
  if (!utils.isPopulatedArray(data)) {
    return;
  }

  const categoryResults = utils.createElemAndAppend(
    "div",
    `main__${categoryName}-results`,
    $parentElement
  );

  utils.createElemAndAppend("h2", "main__title", categoryResults).text(title);
  utils
    .createElemAndAppend("div", `main__${categoryName}-total`, categoryResults)
    .text(`Total found: ${data.length}`);
}

//Checks if the item is a movie, tv or person and calls the appropriate helper-function
function MovieTvOrPerson($card, $cardImg, data, type, imgPath) {
  switch (type) {
    case "movie":
      movie($card, data);
      $cardImg.attr("src", `${IMAGE_URL}/${imgPath}/${data.poster_path}`);
      $cardImg.attr("alt", data.title || data.name);
      break;
    case "tv":
      tv($card, data);
      $cardImg.attr("src", `${imgPath}/${data.poster_path}`);
      $cardImg.attr("alt", data.title || data.name);
      break;
    case "person":
      actor($card, data);
      $cardImg.attr("src", `${imgPath}/${data.profile_path}`);
      $cardImg.attr("alt", data.name);
      break;
  }
}
function movie($card, data) {
  const $cardBody = utils.createElemAndAppend("div", "card-body", $card);
  utils.createElemAndAppend("h5", "card-title", $cardBody).text(data.title);
  utils
    .createElemAndAppend("p", "card-subtitle", $cardBody)
    .text(`Release date: ${data.release_date}`);
  utils.createElemAndAppend("p", "card-text", $cardBody).text(data.overview);
}

function tv($card, data) {
  const $cardBody = utils.createElemAndAppend("div", "card-body", $card);
  utils.createElemAndAppend("h5", "card-title", $cardBody).text(data.name);
  utils
    .createElemAndAppend("p", "card-subtitle", $cardBody)
    .text(`First aired: ${data.first_air_date}`);
  utils.createElemAndAppend("p", "card-text", $cardBody).text(data.overview);
}

function actor($card, data) {
  const $cardBody = utils.createElemAndAppend("div", "card-body", $card);
  utils.createElemAndAppend("h5", "card-title", $cardBody).text(data.name);
  utils
    .createElemAndAppend("h5", "card-subtitle", $cardBody)
    .text(`Known for: ${data.known_for_department}`);

  for (let i = 0; i < data.known_for.length; i++) {
    const item = data.known_for[i];
    const mediaType = item.media_type === "tv" ? "TV" : "Movie";
    const titleOrName = item.media_type === "tv" ? item.name : item.title;
    utils
      .createElemAndAppend("p", "card-text", $cardBody)
      .text(`${mediaType}: ${titleOrName}`);
  }
}
