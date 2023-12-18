export function showSublist(elem) {
  elem.removeClass("nav__sublist");
  elem.addClass("nav__sublist--hover-visible");
}

export function hideSublist(elem) {
  elem.addClass("nav__sublist");
  elem.removeClass("nav__sublist--hover-visible");
}

export function displayMovieList(movies) {
  const movieList = $(".main__movie-list");
  movieList.empty();
  movies.forEach((movie) => {
    const movieEl = createElemAndAppend("div", "movie", movieList);
    const movieTitle = createElemAndAppend("h3", "movie__title", movieEl);
    const movieDescription = createElemAndAppend(
      "p",
      "movie__description",
      movieEl
    );
    const movieImage = createElemAndAppend("img", "movie__image", movieEl);
    movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieImage.alt = movie.title;
    movieDescription.innerText = movie.overview;
    movieTitle.innerText = movie.title;
  });
}

export function displayActorList(actors) {
  const actorListSelector = ".main__actor-list";
  const $actorList = $(actorListSelector);
  $actorList.empty();

  actors.forEach((actor) => {
    const $actorEl = createElemAndAppend("div", "actor", actorListSelector);
    createElemAndAppend("h3", "actor__name", $actorEl).text(actor.name);

    const $actorImage = createElemAndAppend("img", "actor__image", $actorEl);
    $actorImage.attr(
      "src",
      `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
    );
    $actorImage.attr("alt", actor.name);

    if (actor.known_for && actor.known_for.length > 0) {
      const $list = createElemAndAppend("ul", "actor__list", $actorEl);
      for (let i = 0; i < actor.known_for.length; i++) {
        const $knownFor = createElemAndAppend(
          "li",
          "actor__known-for",
          $actorEl
        ).text(actor.known_for[i].media_type + actor.known_for[i].title);
      }
    }
  });
}

export function displayMovie() {
  //Image
  //title
  //release date
  //overview
}

export function displayActor() {
  //Image
  //name
  //Known for
  //list of movies and tv shows
}

export function displayError(error) {
  const errorEl = createEl("div", "error");
  errorEl.innerText = error;
  $(".movie-list").append(errorEl);
}

function createElemAndAppend(tag, className, parentSelector) {
  const $el = $(`<${tag}>`, { class: className });
  $(parentSelector).append($el);
  return $el;
}
