import React from 'react'
import {signOut ,onAuthStateChanged} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {addUser,removeUser} from '../utils/userSlice';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGO, USER_AVTAR } from '../utils/constant';

const Header = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [login,setlogin]=useState(false);

  const handleSignOut=()=>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error")
    });
  }

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const {uid,email,photoURL} = user;
            dispatch(addUser({uid:uid,email:email,photoURL:photoURL}));
            setlogin(true);
            navigate("/browse");
          } else {
            dispatch(removeUser());
            setlogin(false);
            navigate("/");
          }
        });

      return () => unsubscribe();
  },[])

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className="w-72"
        src={LOGO}
        alt="logo"/>
          { login &&
              (<div className='flex p-8'>
                <img className='w-12 h-12 m-2'
                alt="user-icon"
                src={USER_AVTAR}>
                </img>
                <button onClick={handleSignOut} className='font-bold text-white text-lg'>(Sign Out)</button>
            </div>
            )
          }
    </div>
  )
}

export default Header