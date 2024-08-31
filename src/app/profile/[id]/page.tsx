
import React from 'react'

export default function page({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <h1 className='text-2xl'>Profile Page</h1>
      <br />


      <div className="mt-3  z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <p
          className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        />
      </div>

      
        <h2 className='p-3 bg-green-500 rounded text-black' >{params.id}</h2>
<br />
      <div className='flex flex-row gap-2'>
      <a href="/profile"><button  className='text-sm p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>Go Back</button></a>
      <a href="/"><button  className='text-sm p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>Visit Main Page</button></a>
      </div>
    </div>
  )
} 


