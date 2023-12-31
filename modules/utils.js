// create detailed card for any item with a title, details and image when list === 1

// Create a card and append it to the parentSelector
export function createCardAndAppend(parentSelector, data, type, imgPath) {
  const $parent = $(parentSelector);
  const $card = createElemAndAppend("div", "card", $parent);

  // Common elements for all types
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
