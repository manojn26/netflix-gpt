import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-6xl font-bold'>{title}</h1>
            <p className='py-6 text-lg w-1/4'>{overview.slice(0, 120)}</p>
            <div className=''>
                <button className='bg-white text-black font-bold p-2 px-12 text-lg rounded-lg hover:bg-opacity-80'>▷Play</button>
                <button className='bg-gray-500 text-white p-2 px-12 text-lg bg-opacity-50 rounded-lg mx-2'>ⓘ More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle