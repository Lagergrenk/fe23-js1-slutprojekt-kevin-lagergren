import * as eventlistner from "./eventlistner.js";

$(document).ready(function () {
  eventlistner.setupHoverNav();
  eventlistner.setupSearch();
  eventlistner.setupList(".nav__subitem");
});
