import React from 'react'
import Header from './Header'
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies'
import { usePopularMovies } from "../hooks/usePopularMovies"
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import { useTopRatedMovies } from '../hooks/useTopRatedMovies'
import { useUpcomingMovies } from "../hooks/useUpcomingMovies"
import GptSearch from './GptSearch'
import { useSelector } from 'react-redux'

const Browse = () => {

    useNowPlayingMovies()
    usePopularMovies()
    useTopRatedMovies()
    useUpcomingMovies()

    const showGptSearch = useSelector(store => store.gpt.showGptSearch)

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
            {
                showGptSearch ? <GptSearch /> : <>
                    <MainContainer />
                    <SecondaryContainer />
                </>
            }


        </div>
    )
}

export default Browse