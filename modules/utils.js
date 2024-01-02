// Create a card and append it to the parentSelector
export function createCardAndAppend(parentSelector, data, type, imgPath) {
  const $parent = $(parentSelector);
  const $card = createElemAndAppend("div", "card", $parent);

  // Create a link and append it to the card
  const $link = createElemAndAppend("a", "", $card);
  $link.attr("href", `https://www.themoviedb.org/${type}/${data.id}`);
  $link.attr("target", "_blank");
  createElemAndAppend("img", "card-img-top", $link);

  return $card;
}

export function createElemAndAppend(tag, className, parentSelector) {
  const $el = $(`<${tag}>`, { class: className });
  $(parentSelector).append($el);
  return $el;
}

export function isPopulatedArray(arr) {
  if (arr.length > 0) {
    return true;
  }
}
