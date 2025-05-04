import React from 'react'

const RidingPanel = ({ride}) => {
  return (
    <div className='w-full flex flex-col justify-start gap-4 h-full pt-4'>
            <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center'>
                    <img src={ride.captain.profilePic} alt="" className='w-[70px] h-[70px] object-cover rounded-full'/>
                </div>
                <div className='flex flex-col justify-center items-end'>
                    <p className='text-lg font-semibold capitalize'>{ride.captain.fullname.firstname+' '+ride.captain.fullname.lastname}</p>
                    <p className='text-2xl font-bold'>{ride.captain.vehicle.vehicleNumber}</p>
                    <p className='text-md text-gray-600 font-semibold capitalize'>{ride.captain.vehicle.vehicleType+' '+ride.captain.vehicle.capacity}</p>
                </div>
            </div>
            <div className='flex flex-col w-full gap-4'>
                <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                    <div className='flex justify-center items-center rounded-full'>
                        <i className="ri-map-pin-range-fill text-xl"></i>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold'>Destination</p>
                        <p className='text-md text-gray-600 font-semibold'>{ride.destination}</p>
                    </div>
                </div>
                <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                    <div className='flex justify-center items-center rounded-full'>
                        <i className="ri-money-rupee-circle-fill text-xl"></i>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold'><span>&#8377;</span>{ride.fare}</p>
                        <p className='text-md text-gray-600 font-semibold'>Cash on delivery</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center items-center'>
                <button className='w-full bg-green-600 text-white px-8 py-4 font-medium rounded-md flex justify-center items-center'>Make a Payment</button>
            </div>  
    </div>
  )
}

export default RidingPanel