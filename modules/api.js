import { errorHandler } from "./errorhandler.js";

const API_KEY = "02cd657ef46d092540aae7a2718a06fa";
const API_URL = "https://api.themoviedb.org/3";

// Todo: Add Error handling from error handler
async function getDataFromApi(endpoint) {
  // Determine if the endpoint already has a query parameter
  const hasQueryParams = endpoint.includes("?");
  const url = `${API_URL}/${endpoint}${
    hasQueryParams ? "&" : "?"
  }api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else if (response.status === 404) {
      throw 404;
    } else {
      throw "error";
    }
  } catch (error) {
    errorHandler(error || 500, ".main__content");
  }
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
