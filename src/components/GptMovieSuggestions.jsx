import React from 'react'
import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const GptMovieSuggestions = () => {
    const { movieNames, movieResults } = useSelector(store => store.gpt)

    if (!movieNames) return null;

    return (
        <div className='p-4 m-4 bg-black text-white bg-opacity-50'>
            <div>
                {/* <h1>{movieNames[0]}</h1> */}
                {
                    movieNames.map((movie, index) => <MovieList key={movie?.id} title={movie} movies={movieResults[index]} />)
                }

            </div>
        </div>
    )
}

export default GptMovieSuggestions