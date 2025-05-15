import React, { useState } from 'react'
import { toast } from 'react-toastify';

const DriverFoundPanel = ({chosenVehicle, ride, setMessagePanel, messageAlert, setMessageAlert}) => {

    const handleCopyNumber = () => {
        navigator.clipboard.writeText(ride.captain.phoneNumber).then(() => {
            toast.success('Contact number copied!')
        }).catch((error) => {
            console.log(error);
        });
    }
  return (
    <div className='w-full pt-4'>
        <div className='flex flex-col w-full gap-4'>
            <div className='font-bold text-3xl w-full'>Driver is on his way</div>
            <div className='flex justify-between items-center'>
                <div className='relative flex justify-center items-center'>
                    <img className='w-[160px]' src={chosenVehicle || 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png'} alt="" />
                    <img src={ride.captain.profilePic} alt="" className='w-[70px] h-[70px] object-cover rounded-full absolute z-20 left-0'/>
                </div>
                <div className='flex flex-col justify-center items-end'>
                    <p className='text-lg font-semibold capitalize'>{ride.captain.fullname.firstname+' '+ride.captain.fullname.lastname}</p>
                    <p className='text-2xl font-bold uppercase'>{ride.captain.vehicle.vehicleNumber}</p>
                    <p className='text-md text-gray-600 font-semibold capitalize'>{ride.captain.vehicle.vehicleType+' '+ride.captain.vehicle.capacity}</p>
                    <div className='flex gap-5 justify-end items-center py-2 w-full'>
                        <button className=' h-[50px] w-[50px] flex justify-center items-center rounded-full bg-gray-200' onClick={handleCopyNumber}><i className="ri-phone-fill text-2xl"></i></button>
                        <button className='relative h-[50px] w-[50px] flex justify-center items-center rounded-full bg-gray-200' onClick={() => {
                            setMessagePanel(true);
                            setMessageAlert(false);
                    }}><i className="ri-message-2-fill text-2xl"></i>
                    {messageAlert && <div className='bg-green-600 w-[12px] h-[12px] rounded-full absolute top-0 right-0'></div>}
                    </button>
                    </div>
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
                        <i className="ri-square-fill text-xl"></i>
                    </div> 
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold'>Pickup</p>
                        <p className='text-md text-gray-600 font-semibold'>{ride.pickup}</p>
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
                <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                    <div className='flex justify-center items-center rounded-full'>
                        <i className="ri-numbers-line text-xl"></i>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold'>{ride.otp}</p>
                        <p className='text-md text-gray-600 font-semibold'>OTP</p>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default DriverFoundPanel