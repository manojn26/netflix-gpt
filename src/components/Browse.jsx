import React from 'react'
import Header from './Header'
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies'
import { usePopularMovies } from "../hooks/usePopularMovies"
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import { useTopRatedMovies } from '../hooks/useTopRatedMovies'
import { useUpcomingMovies } from "../hooks/useUpcomingMovies"

const Browse = () => {

    useNowPlayingMovies()
    usePopularMovies()
    useTopRatedMovies()
    useUpcomingMovies()

    return (
        <div>
            <Header />
            {
                /*  
                Maincontainer
                    - Videocontainer
                    - Videotitle
                
                Secondarycontainer
                    - Movielist * n
                        - cards * n
                
                */
            }
            <MainContainer />
            <SecondaryContainer />
        </div>
    )
}

export default Browse