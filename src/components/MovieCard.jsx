import React from 'react'
import { TMDB_IMAGE_CDN_URL } from "../utils/constants"

const MovieCard = ({ posterPath }) => {
    return (
        <div className='w-48 pr-4'>
            <img src={TMDB_IMAGE_CDN_URL + posterPath} alt="Movie Not Loaded" />
        </div>
    )
}

export default MovieCard