const API_KEY = "02cd657ef46d092540aae7a2718a06fa";
const API_URL = "https://api.themoviedb.org/3";

// Todo: Add Error handling from error handler
async function getDataFromApi(endpoint) {
  // Determine if the endpoint already has a query parameter
  const hasQueryParams = endpoint.includes("?");
  const url = `${API_URL}/${endpoint}${
    hasQueryParams ? "&" : "?"
  }api_key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    // Todo: Implement error handling
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.results;
}

// Get functions
export async function getSearch(type, query) {
  const endpoint = `search/${type}?query=${query}`;
  return getDataFromApi(endpoint);
}

export async function getPopular(type) {
  let endpoint = `${type}/popular`;
  return getDataFromApi(endpoint);
}

export async function getTopRated(type) {
  let endpoint = `${type}/top_rated`;
  return getDataFromApi(endpoint);
}
