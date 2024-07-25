import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptslice",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addAiGeneratedMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGptSearchView, addAiGeneratedMovieResults } =
  gptSlice.actions;
export default gptSlice.reducer;
