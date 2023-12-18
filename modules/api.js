const API_KEY = "02cd657ef46d092540aae7a2718a06fa";
const API_URL = "https://api.themoviedb.org/3";

async function getDataFromApi(endpoint) {
  const url = `${API_URL}/${endpoint}&api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  console.log(data.results);
  return data.results;
}

// Get functions
export async function getMovies(query) {
  const endpoint = `search/movie?query=${query}`;
  return getDataFromApi(endpoint);
}

export async function getActors(query) {
  const endpoint = `search/person?query=${query}`;
  return getDataFromApi(endpoint);
}

export async function getPopularMovies() {
  const endpoint = `movie/popular`;
  return getDataFromApi(endpoint);
}

export async function getPopularActors() {
  const endpoint = `person/popular`;
  return getDataFromApi(endpoint);
}

export async function getImage(endpoint, id) {
  const url = `${API_URL}/${endpoint}/${id}/images?api_key=${API_KEY}`;
  return getDataFromApi(url);
}
