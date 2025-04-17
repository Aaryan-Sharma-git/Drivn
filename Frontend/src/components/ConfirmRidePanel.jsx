import React from 'react'
import axios from 'axios';

const ConfirmRidePanel = ({setConfirmRidePanelOpen, chosenVehicle, setWaitingForDriverPanelOpen, setVehiclePanelOpen, setDriverFoundPanelOpen, pickup, destination, fare, vehicleType, setOtp}) => {

    const handleClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup: pickup,
                destination: destination,
                vehicleType: vehicleType
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                },
                withCredentials: true
              })

              setOtp(response.data.otp);

                setWaitingForDriverPanelOpen(true);
                setConfirmRidePanelOpen(false);
                setVehiclePanelOpen(false);

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-full pt-4'>
        <div className='flex flex-col w-full gap-4'>
            <div className='font-bold text-3xl w-full'>Confirm your ride</div>
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
                <button onClick={handleClick} className='w-full bg-green-600 text-white px-8 py-4 font-medium rounded-md flex justify-center items-center'>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmRidePanel