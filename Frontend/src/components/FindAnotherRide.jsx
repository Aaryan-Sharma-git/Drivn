import React from 'react'

const FindAnotherRide = ({handleAnotherRide}) => {
  return (
    <div className='bg-black/80 z-40  w-full h-full flex justify-center items-center'>
        <div className=' bg-white p-6 flex flex-col gap-6 w-2/3'>
            <p className='font-semibold text-2xl text-center w-full'>Your ride has been cancelled.</p>
            <div className='flex justify-center items-center'>
                <button onClick={handleAnotherRide} className='w-full bg-black text-white px-4 py-4 font-medium rounded-md flex justify-center items-center cursor-pointer'>Find another ride</button>
            </div>
        </div>
    </div>
  )
}

export default FindAnotherRide