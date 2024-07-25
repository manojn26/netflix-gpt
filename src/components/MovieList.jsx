import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    console.log(movies);
    return (
        <div className='px-6'>
            <h1 className='text-4xl py-4 text-white'>{title}</h1>
            <div className='flex overflow-x-scroll'>
                <div className='flex'>
                    {
                        !movies ? null : movies.map(movie => (

                            movie?.poster_path !== null ? <MovieCard key={movie?.id} posterPath={movie.poster_path} /> : null
                        ))

                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList