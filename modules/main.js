import * as eventlistner from "./eventlistner.js";

// Initialize the app
$(document).ready(function () {
  eventlistner.setupSearch();
  eventlistner.setupList(".nav__subitem");
});
