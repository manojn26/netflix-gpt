import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidSignInData, checkValidSignUpData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState()
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)

    const dispatch = useDispatch()


    const navigate = useNavigate()

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleSignIn = () => {
        // validate the form data
        const message = checkValidSignInData(email.current?.value, password.current?.value)
        setErrorMessage(message)

        if (message) return;

        // Sign in
        signInWithEmailAndPassword(auth, email.current?.value, password.current?.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate("/browse")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage)
            });
    }

    const handleSignUp = () => {
        // validate the form data
        const message = checkValidSignUpData(email.current?.value, password.current?.value, name.current?.value)
        setErrorMessage(message)

        if (message) return;

        // Sign up
        createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                updateProfile(auth.currentUser, {
                    displayName: name.current?.value, photoURL: "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_640.png"
                }).then(() => {
                    // Profile updated!
                    const { uid, email, displayName, photoURL } = auth?.currentUser;
                    dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                    navigate("/browse")
                }).catch((error) => {
                    // An error occurred
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage)
                });

                console.log(user);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage)
            });
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/335ddde7-3955-499c-b4cc-ca2eb7e1ae71/a7d20bc1-831c-4f9d-8153-11bdf7a08d23/IN-en-20240624-POP_SIGNUP_TWO_WEEKS-perspective_WEB_13cda806-d858-493e-b4aa-f2792ff965dc_medium.jpg' alt='Logo Not Loaded' />
            </div>

            <form className='absolute w-3/6 p-12 bg-black  my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80' onSubmit={(e) => e.preventDefault()}>
                <h1 className='font-bold text-3xl py-4  '>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {
                    isSignInForm ? null : <input ref={name} type="text" placeholder='Full Name' className='p-3 my-4 w-full bg-gray-700' />
                }
                <input ref={email} type="text" placeholder='Email Id' className='p-3 my-4 w-full bg-gray-700' />
                <input ref={password} type="password" placeholder='Password' className='p-3 my-4 w-full bg-gray-700' />

                <p className='text-red-500 font-bold text-lg p-2'>{errorMessage}</p>
                {
                    isSignInForm ? <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleSignIn}>Sign In</button> : <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleSignUp}>Sign Up</button>
                }

                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign  Up Now" : "Already have an Account ? Sign In Now"}</p>
            </form>
        </div>
    )
}

export default Login