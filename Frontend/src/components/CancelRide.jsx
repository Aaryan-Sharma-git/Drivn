import React from 'react'

const CancelRide = ({setCancelRideComponent, handleRideCancellation}) => {
  return (
    <div className='bg-black/80 z-40  w-full h-full flex justify-center items-center'>
        <div className=' bg-white p-6 flex flex-col gap-6 w-2/3'>
            <p className='font-semibold text-2xl text-center w-full'>Are you sure?</p>
            <div className='flex gap-6'>
                <button onClick={handleRideCancellation} className='w-1/2 bg-green-600 text-white px-4 py-4 font-medium rounded-md flex justify-center items-center cursor-pointer'>Yes, I am</button>
                <button onClick={() => {
                    setCancelRideComponent(false)
                }} className='w-1/2 bg-red-600 text-white px-4 py-4 font-medium rounded-md flex justify-center items-center cursor-pointer'>No</button>
            </div>
        </div>
    </div>
  )
}

export default CancelRide