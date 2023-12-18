const API_KEY = "02cd657ef46d092540aae7a2718a06fa";

async function searchMovie(movie) {
  console.log(movie);
  const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  console.log(data);
}

export { searchMovie };
