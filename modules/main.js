import * as eventlistner from "./eventlistner.js";

$(document).ready(function () {
  eventlistner.setupHoverNav();
  eventlistner.setupMovieSearch();
  eventlistner.setupPopular(".nav__subitem");
});
