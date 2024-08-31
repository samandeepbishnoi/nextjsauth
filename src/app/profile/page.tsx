'use client'
import React , {useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast'; // good library use this study about this
import { useRouter } from 'next/navigation';
export default function ProfilePage() {
    const router = useRouter()
    const [data, setdata] = useState("nothing");

    const getUserDetails = async ()=>{
        const res = await axios.post("/api/users/me")
        console.log(res.data);

        setdata(res.data.data._id) //  there was some issue in console log issue resolved 
        
    }

    const logout = async ()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success("logout success")
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
            
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className='text-2xl'>Profile Page</h1>
      <br />


      <div className="mt-3  z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <p
          className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert" 
        />
      </div>


      <h2>{data==="nothing" ? "No data found":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <br />
      <div className='flex flex-row gap-2'>
      <button onClick={getUserDetails} className='text-sm p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>Get User Details</button>
      <a href="/"><button  className='text-sm p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>Visit Main Page</button></a>
      </div>
      <button onClick={logout} className='text-sm p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>Logout</button>

    </div>
  );
}

 
