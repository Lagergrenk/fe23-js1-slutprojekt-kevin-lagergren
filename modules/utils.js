// Create a card and append it to the parentSelector
export function createCardAndAppend(parentSelector, data, type, imgPath) {
  const $parent = $(parentSelector);
  const $card = createElemAndAppend("div", "card", $parent);

  // Common elements for all types
  const $link = createElemAndAppend("a", "", $card);
  $link.attr("href", `https://www.themoviedb.org/${type}/${data.id}`);
  $link.attr("target", "_blank");
  const $cardImg = createElemAndAppend("img", "card-img-top", $link);

  // Delegate to specific helper functions based on type
  MovieTvOrPerson($card, $cardImg, data, type, imgPath);

  return $card;
}

export function createElemAndAppend(tag, className, parentSelector) {
  const $el = $(`<${tag}>`, { class: className });
  $(parentSelector).append($el);
  return $el;
}
//------------------ Helper functions ------------------//
function movie($card, data) {
  const $cardBody = createElemAndAppend("div", "card-body", $card);
  createElemAndAppend("h5", "card-title", $cardBody).text(data.title);
  createElemAndAppend("p", "card-subtitle", $cardBody).text(
    `Release date: ${data.release_date}`
  );
  createElemAndAppend("p", "card-text", $cardBody).text(data.overview);
}

function tv($card, data) {
  const $cardBody = createElemAndAppend("div", "card-body", $card);
  createElemAndAppend("h5", "card-title", $cardBody).text(data.name);
  createElemAndAppend("p", "card-subtitle", $cardBody).text(
    `First aired: ${data.first_air_date}`
  );
  createElemAndAppend("p", "card-text", $cardBody).text(data.overview);
}

function actor($card, data) {
  const $cardBody = createElemAndAppend("div", "card-body", $card);
  createElemAndAppend("h5", "card-title", $cardBody).text(data.name);
  createElemAndAppend("h5", "card-subtitle", $cardBody).text(
    `Known for: ${data.known_for_department}`
  );

  for (let i = 0; i < data.known_for.length; i++) {
    const item = data.known_for[i];
    const mediaType = item.media_type === "tv" ? "TV" : "Movie";
    const titleOrName = item.media_type === "tv" ? item.name : item.title;
    createElemAndAppend("p", "card-text", $cardBody).text(
      `${mediaType}: ${titleOrName}`
    );
  }
}
function MovieTvOrPerson($card, $cardImg, data, type, imgPath) {
  switch (type) {
    case "movie":
      movie($card, data);
      $cardImg.attr("src", `${imgPath}/${data.poster_path}`);
      $cardImg.attr("alt", data.title || data.name);
      break;
    case "tv":
      tv($card, data);
      $cardImg.attr("src", `${imgPath}/${data.poster_path}`);
      $cardImg.attr("alt", data.title || data.name);
      break;
    case "person":
      actor($card, data);
      $cardImg.attr("src", `${imgPath}/${data.profile_path}`);
      $cardImg.attr("alt", data.name);
      break;
  }
}
