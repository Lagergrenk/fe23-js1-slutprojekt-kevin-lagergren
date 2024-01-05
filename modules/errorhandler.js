import * as utils from "./utils.js";

export function errorHandler(statusCode, $parentSelector) {
  switch (statusCode) {
    case 404:
      errorMessage("No results found", $parentSelector);
      break;
    case 500:
      errorMessage("Server error", $parentSelector);
      break;
    default:
      errorMessage(
        "Something went wrong, please try again later",
        $parentSelector
      );
      break;
  }
}

export function errorMessage(message, $parentSelector) {
  $parentSelector.empty();
  let $errorMessage = $($parentSelector).find(".error-message");

  // If the error message doesn't exist, create it
  if ($errorMessage.length === 0) {
    $errorMessage = utils.createElemAndAppend(
      "div",
      "error-message",
      $parentSelector
    );
    utils.createElemAndAppend("h1", "error-message__text", $errorMessage);
  } else {
    $errorMessage.find(".error-message__text").empty();
  }
  $errorMessage.find(".error-message__text").text(message);
}
