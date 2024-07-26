import React from 'react'
import MovieList from './MovieList'
import { useSelector } from "react-redux"

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies);

    return (
        <div className=' bg-black'>
            <div className='mt-0 md:-mt-44 pl-2 md:pl-12 relative z-20'>
                <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
                <MovieList title={"Top Rated Movies"} movies={movies?.topRatedMovies} />
                <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
                <MovieList title={"Popular Movies"} movies={movies?.popularMovies} />
            </div>

            {/*
            MovieList - Popular
                MovieCards * n
            MovieList - Now Playing
            MovieList - Trending
            MovieList - Horror
            */}
        </div>
    )
}

export default SecondaryContainer