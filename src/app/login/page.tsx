'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';

import Link from 'next/link';
export default function LoginPage(){
  
  const router = useRouter()

  const [user, setUser] = useState({
    email:"" ,
    password:"",
    
  })

  const [buttonDisabled , setButtonDisabled] = useState(false)
  const [loading , setLoading] = useState(false)

  const onLogin = async ()=>{
    try {
      
      setLoading(true)
      const response =await axios.post("/api/users/login" , user)
      console.log("login success" , response.data);
      router.push("/profile")
      


    } catch (error:any) {
      setLoading(false)
      console.log("login failed")
      toast.error(error.message)
      if (error.response?.data?.error === "User not found") {
        alert("User does not exist. Please check your email or sign up.");
      } else if (error.response?.data?.error === "Email not verified") {
        alert("Email not verified. Please verify your email to log in.");
      } else if (error.response?.data?.error === "Password is invalid") {
        alert("Invalid password. Please try again.");
      } 

      else {
        toast.error(error.message);
      }
    }
  }
  useEffect(()=>{

    if (user.email.length>0 && user.password.length>0 ){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }

  },[user])

  return (
    
    <div className='flex flex-col items-center justify-center min-h-screen py-2  '>
      
      <h1 className='text-3xl'>{loading? "Processing..." : "Login"}</h1>
      <br />
      <hr />


      <div className="mt-3  z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <p
          className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        />
      </div>

    
      <label htmlFor="Email ">Email</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' id="email" type="email" placeholder='email' value={user.email} onChange={(e)=> setUser({...user , email:e.target.value})} />


      <label htmlFor="Password ">Password</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' id="password" type="password" placeholder='password' value={user.password} onChange={(e)=> setUser({...user , password:e.target.value})} />

      <button onClick={onLogin} 
      className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'cursor-not-allowed' : ''}`}
      disabled = {buttonDisabled}>
        Login
      </button>

      <Link href="/signup">Visit signup page</Link>

    </div>
    
  );
}


