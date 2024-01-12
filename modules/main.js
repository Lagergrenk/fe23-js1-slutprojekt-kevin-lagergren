import * as eventlistner from "./eventlistner.js";

// Initialize the app
$(document).ready(function () {
  eventlistner.setupSearchClick();
  eventlistner.setupSearchEnter();
  eventlistner.setupList(".nav__subitem");
});
