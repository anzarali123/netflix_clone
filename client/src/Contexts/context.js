import { createContext, useState, useEffect, useCallback } from "react";
import { API_KEY, TMDB_BASE_URL } from "../utils/TMDB/tmdb.utils";

export const MoviesContext = createContext({
  genres: [],
  all: [],
  movies: [],
  genre: null,
  moviesByGenre: [],
  tvShows: [],
  setGenre: () => {},
  getUserLikedMovies: () => {},
  userLikedMovies: [],
  removeFromLikedMovies: () => {},
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const { results } = await fetch(`${api}${paging ? `&page=${i}` : ""}`).then(
      (res) => res.json()
    );
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const MoviesProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [all, setAll] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      const { genres } = data;
      setGenres(genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      const all = await getRawData(
        `${TMDB_BASE_URL}/trending/all/week?api_key=${API_KEY}`,
        genres,
        true
      );
      setAll(all);
    };
    fetchAll();
  }, [genres]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getRawData(
        `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
        genres,
        true
      );
      setMovies(movies);
    };
    fetchMovies();
  }, [genres]);

  useEffect(() => {
    const fetchDataByGenre = async () => {
      const moviesByGenre = await getRawData(
        `https://api.themoviedb.org/3/discover/movie?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
        genres
      );
      setMoviesByGenre(moviesByGenre);
    };
    fetchDataByGenre();
  }, [genre, genres]);

  useEffect(() => {
    const fetchDataByGenre = async () => {
      const showsByGenre = await getRawData(
        `https://api.themoviedb.org/3/discover/tv?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
        genres
      );
      setTvShows(showsByGenre);
    };
    fetchDataByGenre();
  }, [genre, genres]);

  const getUserLikedMovies = useCallback(async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/liked/${email}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const removeFromLikedMovies = useCallback(async (email, movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/remove`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, movieId }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const value = {
    genres,
    all,
    movies,
    setGenre,
    moviesByGenre,
    tvShows,
    getUserLikedMovies,
    removeFromLikedMovies,
  };
  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};
