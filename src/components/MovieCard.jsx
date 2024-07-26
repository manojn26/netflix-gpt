import React from 'react'
import { TMDB_IMAGE_CDN_URL } from "../utils/constants"
import { Link } from 'react-router-dom'

const MovieCard = ({ posterPath, id }) => {
    return (
        <Link to={`/video/${id}`}>
            <div className='w-36 md:w-48 pr-4 cursor-pointer'>
                <img src={TMDB_IMAGE_CDN_URL + posterPath} alt="Movie Not Loaded" />
            </div>
        </Link>
    )
}

export default MovieCard