import * as utils from "./utils.js";
//Todo: Add error handling for the api calls
export function errorHandler(statusCode, $parentSelector) {
  switch (statusCode) {
    case 404:
      errorMessage("No results found", $parentSelector);
      break;
    case 500:
      errorMessage("Server error", $parentSelector);
      break;
    default:
      errorMessage("Something went wrong", $parentSelector);
      break;
  }
}

export function errorMessage(message, $parentSelector) {
  const $errorMessage = utils.createElemAndAppend(
    "div",
    "error-message",
    $parentSelector
  );
  utils.createElemAndAppend("h1", "error-message__text", $errorMessage);
  $(".error-message__text").text(message);
}
