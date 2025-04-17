import React from 'react'
import Waiting from './animation/Waiting';

const WaitingForDriver = ({chosenVehicle, pickup, destination, fare, vehicleType}) => {
  return (
    <div className='w-full pt-4'>
        <div className='flex flex-col w-full gap-4'>
            <div className='font-bold text-3xl w-full'>Looking for a driver</div>
            <div className='flex justify-center items-center'>
                <img className='w-60' src={chosenVehicle || 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png'} alt="" />
            </div>
            <div className='flex flex-col w-full gap-4'>
                <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                    <div className='flex justify-center items-center rounded-full'>
                        <i className="ri-map-pin-range-fill text-xl"></i>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold'>Destination</p>
                        <p className='text-md text-gray-600 font-semibold'>{destination}</p>
                    </div>
                </div>
                <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                    <div className='flex justify-center items-center rounded-full'>
                        <i className="ri-square-fill text-xl"></i>
                    </div> 
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold'>Pickup</p>
                        <p className='text-md text-gray-600 font-semibold'>{pickup}</p>
                    </div>
                </div>
                <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                    <div className='flex justify-center items-center rounded-full'>
                        <i className="ri-money-rupee-circle-fill text-xl"></i>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold'><span>&#8377;</span>{fare[vehicleType]}</p>
                        <p className='text-md text-gray-600 font-semibold'>Cash on delivery</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center items-center'>
                <Waiting/>
            </div>
        </div>
    </div>
  )
}

export default WaitingForDriver