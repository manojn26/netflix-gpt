import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)

    const signOutHandler = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
        }).catch((error) => {
            // An error happened.
            console.log(error);

        });
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
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img className='w-44 ' src={LOGO} alt='Logo Not Loaded' />

            {
                user && (
                    <div className='flex p-2'>
                        <img className='w-12 h-12' alt='Not Loaded User Icon' src={user?.photoURL} />

                        <button onClick={signOutHandler} className='font-bold text-white ml-5'>Sign Out</button>
                    </div>
                )
            }

        </div>

    )
}

export default Header