import { showSublist, hideSublist } from "./ui.js";
import * as api from "./api.js";
import * as ui from "./ui.js";

// Search for movies, persons and tv-shows
export function setupSearch() {
  $(".main__search-button").click(async function () {
    const searchInput = $(".main__search-input").val();
    try {
      const movies = await api.getSearch("movie", searchInput);
      const person = await api.getSearch("person", searchInput);
      const tv = await api.getSearch("tv", searchInput);
      ui.displaySearchResults(movies, person, tv);
      $(".main__movie-results").click(() =>
        ui.displayItemList(movies, "movie", ".main__content", "movie")
      );
      $(".main__person-results").click(() =>
        ui.displayItemList(person, "person", ".main__content", "person")
      );
      $(".main__tv-results").click(() =>
        ui.displayItemList(tv, "tv", ".main__content", "tv")
      );
    } catch (error) {
      console.log(error);
    }
  });
}

// "buttons" works as a selector for the buttons that should be clicked
// Todo: Add functionality to the buttons
export function setupList(clickedBtn) {
  $(clickedBtn).click(async function () {
    const type = $(this).data("type");
    try {
      switch (type) {
        case "popular-movies":
          const movies = await api.getPopular("movie");
          ui.displayItemList(
            movies,
            "movie",
            ".main__content",
            "movie",
            "Popular Movies"
          );
          break;
        case "popular-persons":
          const persons = await api.getPopular("person");
          ui.displayItemList(
            persons,
            "person",
            ".main__content",
            "person",
            "Popular Persons"
          );
          break;
        case "popular-tvshows":
          const tvshows = await api.getPopular("tv");
          ui.displayItemList(
            tvshows,
            "tv",
            ".main__content",
            "tv",
            "Popular Tv-Shows"
          );
          break;
        case "top-rated-movies":
          const topRatedMovies = await api.getTopRated("movie");
          ui.displayItemList(
            topRatedMovies,
            "movie",
            ".main__content",
            "movie",
            "Top Rated Movies"
          );
          break;
        case "top-rated-tvshows":
          const topRatedTvshows = await api.getTopRated("tv");
          ui.displayItemList(
            topRatedTvshows,
            "tv",
            ".main__content",
            "tv",
            "Top Rated Tv-Shows"
          );
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
}
