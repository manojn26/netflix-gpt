import React from 'react'
import Header from './Header'
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'

const Browse = () => {

    useNowPlayingMovies()
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