import React, { useRef } from 'react'
// import openai from "../utils/openai"
import { generativeAi } from '../utils/geminiAi'
import { TMDB_API_OPTIONS } from '../utils/constants'
import { useDispatch } from "react-redux"
import { addAiGeneratedMovieResults } from '../utils/gptSlice'

const GptSearchBar = () => {
    const searchText = useRef(null)
    const dispatch = useDispatch()

    const searchMovieTMDB = async (movie) => {
        const apiData = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, TMDB_API_OPTIONS)

        const jsonData = await apiData.json()

        return jsonData.results
    }

    const handleGptSearchClick = async () => {
        // console.log(searchText.current.value);

        // // Make an API call to OpenAI Movie Results.
        // const gptResults = await openai.chat.completions.create({
        //     model: 'gpt-3.5-turbo',
        //     messages: [{ role: 'user', content: 'Say this is a test' }],
        //     stream: true,
        // });

        // console.log(gptResults.choices);

        const model = generativeAi.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } })
        let prompt = "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchText.current.value +
            ". only give me names of 5 movies"

        let result = await model.generateContent(prompt)
        // console.log(JSON.parse(result.response.text()));
        const gptMovies = JSON.parse(result.response.text())
        console.log(gptMovies);

        // For each movie we need to search TMDB API
        const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))
        // The above code it will get all promises [Promise,Promise,Promise ] -> these promise are take some time to resolve it

        const tmdbMovieResults = await Promise.all(promiseArray)
        console.log(tmdbMovieResults);
        dispatch(addAiGeneratedMovieResults({ movieNames: gptMovies, movieResults: tmdbMovieResults }))
    }
    return (
        <div className='pt-[10%] flex justify-center'>
            {/* <div className='flex justify-center'>

            </div> */}
            <form onSubmit={(e) => e.preventDefault()} className='w-1/2  grid grid-cols-12'>
                <input ref={searchText} className='p-4 m-4 col-span-9' type="text" placeholder='What would you like to watch today ?' />
                <button onClick={handleGptSearchClick} className='py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3'>Search</button>
            </form>
        </div>
    )
}

export default GptSearchBar