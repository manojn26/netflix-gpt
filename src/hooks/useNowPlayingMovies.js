import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";

export const useNowPlayingMovies = () => {
  // Fetch data from TMDB API and update the store
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const apiData = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      TMDB_API_OPTIONS
    );
    const jsonApiData = await apiData.json();
    console.log(jsonApiData);
    dispatch(addNowPlayingMovies(jsonApiData?.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};
