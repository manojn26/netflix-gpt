import React from 'react'
import { Link } from 'react-router-dom'

const VideoTitle = ({ title, overview, id }) => {
    return (
        <div className='w-screen aspect-video pt-[35%] md:pt-[16%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
            <p className='hidden md:inline-block py-6 text-lg w-1/4'>{overview.slice(0, 120)}</p>
            <div className=''>
                <Link to={`/video/${id}`}>
                    <button className='bg-white text-black font-bold mt-5 md:m-0 p-2 md:p-2 md:py-1 px-3 md:px-12 text-lg rounded-lg hover:bg-opacity-80'>▷Play</button>
                </Link>
                <button className='hidden md:inline-block bg-gray-500 text-white p-2 px-12 text-lg bg-opacity-50 rounded-lg mx-2'>ⓘ More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle