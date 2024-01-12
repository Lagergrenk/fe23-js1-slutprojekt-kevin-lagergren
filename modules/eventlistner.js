import * as api from "./api.js";
import * as ui from "./ui.js";
import { isInputValid } from "./validator.js";
import { errorHandler, errorMessage } from "./errorhandler.js";

//global variables
const $mainContent = $(".main__content");

// Search for movies, persons, and tv-shows
export function setupSearchClick() {
  $(".main__search-button").click(function () {
    performSearch();
  });
}

export function setupSearchEnter() {
  $(".main__search-input").keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      performSearch();
    }
  });
}

function performSearch() {
  const searchInput = $(".main__search-input").val();

  if (!isInputValid(searchInput)) {
    errorMessage("Please enter a search term", $mainContent);
    return;
  }

  fetchData(searchInput);
}

async function fetchData(searchInput) {
  try {
    const movies = await api.getSearch("movie", searchInput);
    const person = await api.getSearch("person", searchInput);
    const tv = await api.getSearch("tv", searchInput);
    ui.displaySearchResults(movies, person, tv);

    $(".main__movie-results").click(() =>
      ui.displayItemList(movies, $mainContent, "movie")
    );
    $(".main__person-results").click(() =>
      ui.displayItemList(person, $mainContent, "person")
    );
    $(".main__tv-results").click(() =>
      ui.displayItemList(tv, $mainContent, "tv")
    );
  } catch (error) {
    errorHandler(error.status_code, $mainContent);
  }
}
// Display the list of items in cards in the main content
export function setupList(clickedBtn) {
  $(clickedBtn).click(async function () {
    const type = $(this).data("type");
    try {
      switch (type) {
        case "popular-movies":
          const popularMovies = await api.getPopular("movie");
          ui.displayItemList(
            popularMovies,
            $mainContent,
            "movie",
            "Popular Movies",
            true
          );
          break;
        case "popular-persons":
          const popularPersons = await api.getPopular("person");
          ui.displayItemList(
            popularPersons,
            $mainContent,
            "person",
            "Popular Persons",
            true
          );
          break;
        case "popular-tvshows":
          const popularTvshows = await api.getPopular("tv");
          ui.displayItemList(
            popularTvshows,
            $mainContent,
            "tv",
            "Popular Tv-Shows",
            true
          );
          break;
        case "top-rated-movies":
          const topRatedMovies = await api.getTopRated("movie");
          ui.displayItemList(
            topRatedMovies,
            $mainContent,
            "movie",
            "Top Rated Movies"
          );
          break;
        case "top-rated-tvshows":
          const topRatedTvshows = await api.getTopRated("tv");
          ui.displayItemList(
            topRatedTvshows,
            $mainContent,
            "tv",
            "Top Rated Tv-Shows"
          );
          break;
      }
    } catch (error) {
      errorHandler(error.status_code, $mainContent);
    }
  });
}
