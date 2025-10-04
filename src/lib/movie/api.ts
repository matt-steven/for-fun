const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const ACCOUNT_ID = process.env.NEXT_PUBLIC_ACCOUNT_ID;

import { Movie } from "@/types/movie";
import { MovieDetails } from "@/types/movieDetails";

const getOptions: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  cache: "no-store",
};

const postOptions: RequestInit = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function checkAuth(): Promise<boolean> {
  const response = await fetch(`${API_URL}/authentication`, getOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch auth");
  }
  return response.json();
}

export async function fetchMovies(page: number): Promise<Movie[]> {
  const response = await fetch(
    `${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    getOptions
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
}

export async function fetchMovieDetails(
  movieId: number
): Promise<MovieDetails> {
  const response = await fetch(
    `${API_URL}/movie/${movieId}?language=en-US`,
    getOptions
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies details");
  }
  const data = await response.json();
  return data;
}

export async function searchMovies(
  title: string,
  page: number
): Promise<Movie[]> {
  const response = await fetch(
    `${API_URL}/search/movie?include_adult=false&language=en-US&query=${title}&page=${page}`,
    getOptions
  );
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  const data = await response.json();
  return data.results;
}

export async function fetchFavourites(): Promise<number[]> {
  const response = await fetch(
    `${API_URL}/account/${ACCOUNT_ID}/favorite/movies`,
    getOptions
  );
  if (!response.ok) {
    throw new Error("Failed to fetch favourite movies");
  }
  const data = await response.json();
  let favourites_ids: number[] = [];
  for (const movie of data.results) {
    favourites_ids.push(movie.id);
  }
  return favourites_ids;
}

export async function sendFavourite(
  movieId: number,
  isFavourite: boolean
): Promise<boolean> {
  const response = await fetch(`${API_URL}/account/${ACCOUNT_ID}/favorite`, {
    ...postOptions,
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      favorite: isFavourite,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch favourite movies");
  }
  const data = await response.json();
  console.log(data.status_message);
  return (
    data.status_message === "Success." ||
    data.status_message === "The item/record was deleted successfully."
  );
}
