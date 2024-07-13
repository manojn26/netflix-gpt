import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='pt-36 px-12'>
            <h1 className='text-6xl font-bold'>{title}</h1>
            <p className='py-6 text-lg w-1/4'>{overview.slice(0, 180)}</p>
            <div className=''>
                <button className='bg-gray-500 text-white p-2 px-12 text-lg  bg-opacity-50 rounded-lg'>▷Play</button>
                <button className='bg-gray-500 text-white p-2 px-12 text-lg bg-opacity-50 rounded-lg mx-2'>More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle