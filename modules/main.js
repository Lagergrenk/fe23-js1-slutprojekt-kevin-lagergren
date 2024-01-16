import * as eventlistner from "./eventlistner.js";

// Initialize the app
$(document).ready(function () {
  eventlistner.setupSearchEvents();
  eventlistner.setupList(".nav__subitem");
});
