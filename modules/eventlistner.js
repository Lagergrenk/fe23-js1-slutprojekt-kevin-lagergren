import { showSublist, hideSublist } from "./ui.js";
import { searchMovie } from "./api.js";

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
      const movies = await searchMovie(searchInput);
      console.log(movies);
    } catch (error) {
      console.log(error);
    }
  });
}
export { setupHoverNav, setupMovieSearch };
