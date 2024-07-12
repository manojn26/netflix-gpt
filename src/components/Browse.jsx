import React, { useEffect } from 'react'
import Header from './Header'
import { TMDB_API_OPTIONS } from '../utils/constants'

const Browse = () => {

    const getNowPlayingMovies = async () => {
        const apiData = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', TMDB_API_OPTIONS)
        const jsonApiData = await apiData.json()
        console.log(jsonApiData);
    }

    useEffect(() => {
        getNowPlayingMovies()
    }, [])
    return (
        <div>
            <Header />
        </div>
    )
}

export default Browse