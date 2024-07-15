import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";

export const useUpcomingMovies = () => {
  // Fetch data from TMDB API and update the store
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const apiData = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      TMDB_API_OPTIONS
    );
    const jsonApiData = await apiData.json();
    // console.log(jsonApiData);
    dispatch(addUpcomingMovies(jsonApiData?.results));
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};
