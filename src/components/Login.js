import React from 'react'
import Header from './Header'
import {checkValidation} from '../utils/validate';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { useState ,useRef} from 'react';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import {addUser} from '../utils/userSlice';
import { BG_IMAGE, USER_AVTAR } from '../utils/constant';

const Login = () => {
    const [isLogin,setisLogin] = useState(true);
    const dispatch=useDispatch();

    const togleSignIn=()=>{
        setisLogin(!isLogin);
    }

    const [errMessage,setErrMessage]=useState(null);
    const name=useRef(null);
    const email=useRef(null);
    const password =useRef(null);

    const handleButtonClick=()=>{
        //Validate form data
        var message;
        message=checkValidation(email.current.value,password.current.value);

        setErrMessage(message);

        if(message) return;

        if(!isLogin){
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
              )
                .then((userCredential) => {
                  const user = userCredential.user;
                  updateProfile(user, {
                    photoURL: USER_AVTAR,
                  })
                    .then(() => {
                      const { uid, email, photoURL } = auth.currentUser;
                      dispatch(
                        addUser({
                          uid: uid,
                          email: email,
                          photoURL: photoURL,
                        })
                      );
                    })
                    .catch((error) => {
                      setErrMessage(error.message);
                    });
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setErrMessage(errorCode + "-" + errorMessage);
                });
    }
    else{
        signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          )
            .then((userCredential) => {
              // Signed in
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrMessage(errorCode + "-" + errorMessage);
            });
        }
    }
  return (
    <div>
        <Header/>
        <div>
            <img className='absolute'
            src={BG_IMAGE}
            alt="body-bg"/>
            <form onSubmit={(e)=>e.preventDefault()}  className='h-120 w-3/12 absolute p-12 font-sans bg-black text-white my-36 mx-auto left-0 right-0 rounded-lg bg-opacity-80'>
                <h1 className='text-3xl font-bold py-4'>
                    { isLogin?"Sign In":"Sign Up"}
                </h1>

                { !isLogin && (
                    <input ref={name} className='p-4 my-4 w-full bg-gray-700'
                    type="text" placeholder='Full Name'  />
                    )
                }

                <input className='p-4 my-4 w-full bg-gray-700 text-black hover:bg-white'
                type="text" placeholder='Email Address' ref={email}/>

                <input className='p-4 my-4 w-full  bg-gray-700  text-black hover:bg-white'
                type="password" placeholder='Password' ref={password}/>

                <p className='text-lg font-bold text-red-500 py-2'>{errMessage}</p>
                <button className='p-4 my-4 text-xl bg-red-700 w-full rounded-lg' onClick={handleButtonClick} 
                >{ isLogin?"Sign In":"Sign Up"}</button>

                <p className='py-4 text-lg cursor-pointer' onClick={togleSignIn}>
                { isLogin?"New to Netfix ? Sign Up Now":"Already a user ? Sign In Now"}
                    </p>

            </form>
        </div>
    </div>
  )
}

export default Login;