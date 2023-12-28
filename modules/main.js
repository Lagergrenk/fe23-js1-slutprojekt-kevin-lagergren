import * as eventlistner from "./eventlistner.js";

$(document).ready(function () {
  eventlistner.setupHoverNav();
  eventlistner.setupMovieSearch();
  eventlistner.setupList(".nav__subitem");
});
