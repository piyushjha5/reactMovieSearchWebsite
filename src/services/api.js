// Using OMDB API - Free, no credit card required
// Get your own free key at: https://www.omdbapi.com/apikey.aspx
const API_KEY = "trilogy"; // Free public demo key (limited requests/day)
const BASE_URL = "https://www.omdbapi.com";

// Curated list of popular movies to show on load (since OMDB has no "popular" endpoint)
const POPULAR_TITLES = [
  "Inception", "Interstellar", "The Dark Knight", "Avengers: Endgame",
  "The Godfather", "Parasite", "Joker", "Spider-Man: No Way Home",
  "Dune", "Top Gun: Maverick", "Avatar", "Oppenheimer",
  "The Shawshank Redemption", "Pulp Fiction", "The Matrix"
];

// Normalize OMDB response to a consistent shape (similar to what the app expects)
const normalizeMovie = (movie) => ({
  id: movie.imdbID,
  title: movie.Title,
  release_date: movie.Year,
  poster_path: movie.Poster !== "N/A" ? movie.Poster : null,
});

export const getPopularMovies = async () => {
  const results = await Promise.allSettled(
    POPULAR_TITLES.map((title) =>
      fetch(`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&type=movie`)
        .then((res) => res.json())
    )
  );

  return results
    .filter((r) => r.status === "fulfilled" && r.value.Response === "True")
    .map((r) => normalizeMovie(r.value));
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
  );
  const data = await response.json();

  if (data.Response === "False") {
    return []; // No results found
  }

  return data.Search.map(normalizeMovie);
};