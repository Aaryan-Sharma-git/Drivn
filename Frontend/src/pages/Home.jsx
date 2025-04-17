import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      <div className='w-screen h-screen flex flex-col justify-center relative'>
        <img className='w-20 absolute left-6 top-6' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="UberIcon"/>

        <div className='bg-red-400 w-full h-[75%] bg-[url(https://images.unsplash.com/photo-1587307293162-2fb7a3ebfc75?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center'>
        </div>

        <div className='flex flex-col justify-between w-full h-[25%] p-6'>

          <p className='text-3xl font-bold'>Get started with Uber</p>

          <Link to='/login' className='w-full bg-black text-white py-4 px-8 font-medium rounded-md flex items-center'>

              <span className="flex-1 text-center">Continue</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>

          </Link>

        </div>

      </div>
    </div>
  )
}

export default Home
