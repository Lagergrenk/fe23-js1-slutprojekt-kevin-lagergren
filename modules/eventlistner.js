import { showSublist, hideSublist } from "./ui.js";
import * as api from "./api.js";
import * as ui from "./ui.js";

export function setupHoverNav() {
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

export function setupSearch() {
  $(".main__search-button").click(async function () {
    const searchInput = $(".main__search-input").val();
    try {
      const movies = await api.getSearch("movie", searchInput);
      const actor = await api.getSearch("person", searchInput);
      const tv = await api.getSearch("tv", searchInput);
      if (movies.lenght === 0 && actor.lenght === 0) {
        displayError("No results found");
      }
      console.log(movies);
      console.log(actor);
      console.log(tv);
      ui.displaySearchResults(movies, actor, tv);
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
          ui.displayItemList(movies, "movie", ".main__content", "movie");
          break;
        case "popular-actors":
          const actors = await api.getPopular("person");
          ui.displayItemList(actors, "actor", ".main__content", "person");
          break;
        case "popular-tvshows":
          const tvshows = await api.getPopular("tv");
          ui.displayItemList(tvshows, "tv", ".main__content", "tv");
          break;
        case "top-rated-movies":
          const topRatedMovies = await api.getTopRated("movie");
          ui.displayItemList(
            topRatedMovies,
            "movie",
            ".main__content",
            "movie"
          );
          break;
        case "top-rated-tvshows":
          const topRatedTvshows = await api.getTopRated("tv");
          ui.displayItemList(topRatedTvshows, "tv", ".main__content", "tv");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
}
