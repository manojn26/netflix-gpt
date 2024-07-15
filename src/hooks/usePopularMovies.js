import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";

export const usePopularMovies = () => {
  // Fetch data from TMDB API and update the store
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const apiData = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      TMDB_API_OPTIONS
    );
    const jsonApiData = await apiData.json();
    // console.log(jsonApiData);
    dispatch(addPopularMovies(jsonApiData?.results));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};
