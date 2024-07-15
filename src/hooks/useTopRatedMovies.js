import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";

export const useTopRatedMovies = () => {
  // Fetch data from TMDB API and update the store
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const apiData = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      TMDB_API_OPTIONS
    );
    const jsonApiData = await apiData.json();
    // console.log(jsonApiData);
    dispatch(addTopRatedMovies(jsonApiData?.results));
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};
