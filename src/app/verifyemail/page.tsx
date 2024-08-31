'use client'
import React , {useState , useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';
export default function VerifyEmailPage () {

    const [token, settoken] = useState("")

    const [verified, setverified] = useState(false);

    const [error, seterror] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setverified(true);
            seterror(false);
        } catch (error: any) {
            seterror(true);
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        seterror(false)
      const urlToken = window.location.search.split("=")[1] // the token is after =
      settoken(urlToken || "")

    }, []);

    useEffect(()=>{
        seterror(false) 
        if (token.length>0){
            verifyUserEmail()
        }
    },[token])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>


    <div className="mt-3  z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <p
          className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        />
      </div>


       <h1 className='text-xl'>Email verification processing with token</h1>
       <br />


       <h2 className='p-2 bg-orange-500 text-black'> {token ? `${token}` : "no token found"}</h2>
       <br />
       {verified && (
        <div>
            <h2>Verified</h2>
            <br />
            <Link href="/login"> <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'> Login </button></Link>
        </div>
       )}

       {error && (
        <div>
            <h2>Error</h2>
            
        </div>
       )}



    </div>
  );
}


