import { setupHoverNav, setupMovieSearch } from "./eventlistner.js";

$(document).ready(function () {
  console.log("main.js loaded");
  setupHoverNav();
  setupMovieSearch();
});
