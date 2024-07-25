import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

export const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  // fetch trailer video

  // Memoizing
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      TMDB_API_OPTIONS
    );
    const jsonData = await apiData.json();

    const filteredTrailors = jsonData?.results.filter(
      (video) => video.type === "Trailer"
    );
    // console.log("Movie Video Data");
    // console.log(filteredTrailors);
    const trailer = filteredTrailors.length
      ? filteredTrailors[0]
      : jsonData?.results[0];
    // console.log("Trailer Data");
    // console.log(trailer);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};
