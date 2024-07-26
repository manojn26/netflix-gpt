import React, { useRef, useState } from 'react'
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

    const [loading, setLoading] = useState(false)

    const handleGptSearchClick = async () => {
        // console.log(searchText.current.value);

        // // Make an API call to OpenAI Movie Results.
        // const gptResults = await openai.chat.completions.create({
        //     model: 'gpt-3.5-turbo',
        //     messages: [{ role: 'user', content: 'Say this is a test' }],
        //     stream: true,
        // });

        // console.log(gptResults.choices);
        setLoading(true)

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
        setLoading(false)
    }
    return (
        <div>

            <div className='pt-[35%] md:pt-[10%] flex justify-center'>
                {/* <div className='flex justify-center'>

            </div> */}
                <form onSubmit={(e) => e.preventDefault()} className='w-full md:w-1/2  grid grid-cols-12'>
                    <input ref={searchText} className='p-4 m-4 col-span-9' type="text" placeholder='What would you like to watch today ?' />
                    <button onClick={handleGptSearchClick} className='-ml-2 md:py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3'>Find</button>
                </form>
            </div>
            <div className='flex justify-center'>
                {loading && <div class="text-center">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default GptSearchBar