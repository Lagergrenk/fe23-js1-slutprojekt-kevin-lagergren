import { showSublist, hideSublist } from "./ui.js";
import { getMovies, getActors } from "./api.js";
import { displayError, displayMovieList, displayActorList } from "./ui.js";

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

function setupMovieSearch() {
  $(".search-button").click(async function () {
    const searchInput = $(".search-input").val();
    try {
      const movies = await getMovies(searchInput);
      const actor = await getActors(searchInput);
      if (movies.lenght === 0 && actor.lenght === 0) {
        displayError("No results found");
      }
      displayActorList(actor);
    } catch (error) {
      console.log(error);
    }
  });
}
export { setupHoverNav, setupMovieSearch };
