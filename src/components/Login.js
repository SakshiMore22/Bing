import React from 'react'
import Header from './Header'
import {checkValidation} from '../utils/validate';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { useState ,useRef} from 'react';
import { useNavigate} from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import {addUser} from '../utils/userSlice';

const Login = () => {
    const [isLogin,setisLogin] = useState(true);
    const navigate= useNavigate();
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
                    photoURL: "https://avatars.githubusercontent.com/u/108238805?v=4L",
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
              navigate("/browse");
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
            src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
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