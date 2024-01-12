import React from 'react'
import Header from './Header'
import { useState } from 'react';

const Login = () => {
    const [isLogin,setisLogin] = useState(true);

    const togleSignIn=()=>{
        setisLogin(!isLogin);
    }
  return (
    <div>
        <Header/>
        <div>
            <img className='absolute'
            src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
            alt="body-bg"/>
            <form className='h-120 w-3/12 absolute p-12 font-sans bg-black text-white my-36 mx-auto left-0 right-0 rounded-lg bg-opacity-80'>
                <h1 className='text-3xl font-bold py-4'>
                    { isLogin?"Sign In":"Sign Up"}
                </h1>

                { !isLogin &&
                    <input className='p-4 my-4 w-full bg-gray-700'
                    type="text" placeholder='Full Name'/>
                }

                <input className='p-4 my-4 w-full bg-gray-700 text-black hover:bg-white'
                type="text" placeholder='Email Address'/>

                <input className='p-4 my-4 w-full  bg-gray-700  text-black hover:bg-white'
                type="password" placeholder='Password'/>

                <button className='p-4 my-4 text-xl bg-red-700 w-full rounded-lg'
                >{ isLogin?"Sign In":"Sign Up"}</button>

                <p className='py-4 text-lg cursor-pointer' onClick={togleSignIn}>
                { isLogin?"New to Netfix ? Sign Up Now":"Already a user ? Sign In Now"}
                    </p>

            </form>
        </div>
    </div>
  )
}

export default Login