import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)

    const signOutHandler = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
        }).catch((error) => {
            // An error happened.
            console.log(error);

        });
    }

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView())
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                //   const uid = user.uid;

                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                navigate("/browse")
            } else {
                // User is signed out
                dispatch(removeUser())
                navigate("/")
            }
        });

        // Unscribe when component unmounts
        return () => {
            unsubscribe()
        }


    }, [])

    return (
        <div className='absolute w-screen py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between '>
            <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='Logo Not Loaded' />

            {
                user && (
                    <div className='flex justify-between md:flex p-2'>
                        <button className='py-2 px-4 mx-4 my-2 border border-gray-200 bg-black cursor-pointer font-bold text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? "Home Page" : "AI Search"}</button>

                        <div className='flex  md:flex'>
                            <img className='hidden md:block w-12 h-12' alt='Not Loaded User Icon' src={user?.photoURL} />
                            <button onClick={signOutHandler} className='font-bold text-white mr-20'>Sign Out</button>
                        </div>

                    </div>
                )
            }

        </div>

    )
}

export default Header