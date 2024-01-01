import * as eventlistner from "./eventlistner.js";

$(document).ready(function () {
  eventlistner.setupSearch();
  eventlistner.setupList(".nav__subitem");
});
