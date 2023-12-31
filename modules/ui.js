/*
TODO:
  - if the user clicks on a movie/tv show/person, display the details of that item or list of items
  - if any results are lenght 0, do not display section of that type
  - if any results are undefined, do not display section of that type
  - create  function for displaying the details of 1 item. more indepth than the card
  

 */

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
// Display the list of items in cards in the main content
// items: array of items to display
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
    const $card = createCardAndAppend($itemList, item, type, IMAGE_URL);
    const $cardImg = $card.find(".card-img-top");
    MovieTvOrPerson($card, $cardImg, item, type, IMAGE_URL);
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

//------------------ Helper functions ------------------//

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
  const $cardBody = createElemAndAppend("div", "card-body", $card);
  createElemAndAppend("h5", "card-title", $cardBody).text(data.title);
  createElemAndAppend("p", "card-subtitle", $cardBody).text(
    `Release date: ${data.release_date}`
  );
  createElemAndAppend("p", "card-text", $cardBody).text(data.overview);
}

function tv($card, data) {
  const $cardBody = createElemAndAppend("div", "card-body", $card);
  createElemAndAppend("h5", "card-title", $cardBody).text(data.name);
  createElemAndAppend("p", "card-subtitle", $cardBody).text(
    `First aired: ${data.first_air_date}`
  );
  createElemAndAppend("p", "card-text", $cardBody).text(data.overview);
}

function actor($card, data) {
  const $cardBody = createElemAndAppend("div", "card-body", $card);
  createElemAndAppend("h5", "card-title", $cardBody).text(data.name);
  createElemAndAppend("h5", "card-subtitle", $cardBody).text(
    `Known for: ${data.known_for_department}`
  );

  for (let i = 0; i < data.known_for.length; i++) {
    const item = data.known_for[i];
    const mediaType = item.media_type === "tv" ? "TV" : "Movie";
    const titleOrName = item.media_type === "tv" ? item.name : item.title;
    createElemAndAppend("p", "card-text", $cardBody).text(
      `${mediaType}: ${titleOrName}`
    );
  }
}
