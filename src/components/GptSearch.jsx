import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { GPT_SEARCH_BACKGROUND_IMAGE } from "../utils/constants"

const GptSearch = () => {
    return (
        <>
            <div className='fixed -z-10'>
                <img className='h-screen object-cover md:w-screen' src={GPT_SEARCH_BACKGROUND_IMAGE} alt='Banner Not Loaded' />
            </div>
            <div className=''>
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </>
    )
}
// 01:24:55
export default GptSearch