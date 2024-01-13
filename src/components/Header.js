import React from 'react'
import {signOut ,onAuthStateChanged} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {addUser,removeUser} from '../utils/userSlice';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';;

const Header = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [login,setlogin]=useState(false);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
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
  },[])

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className="w-72"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"/>
          { login &&
              (<div className='flex p-8'>
                <img className='w-12 h-12 m-2'
                alt="user-icon"
                src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e">
                </img>
                <button onClick={handleSignOut} className='font-bold text-white text-lg'>(Sign Out)</button>
            </div>
            )
          }
    </div>
  )
}

export default Header