import React, { useEffect, useState } from 'react'
import Done from './animation/Done'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompleteRide = ({ride}) => {

    const [playAnimation, setPlayAnimation] = useState(false);

    const navigate = useNavigate();

    async function handleCompleteRide() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/complete-ride`, {
                ride: ride
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })

            if(response.status === 200){
                setPlayAnimation(true);
                setTimeout(() => {
                    navigate('/captain-landing-page')
                }, 4000)
            }
            else{
                console.log('problem completing the ride');
            }
            
        } catch (error) {
            console.log(error);
        }    
    }

  return ( 
    <div className='w-full h-full'>
        {playAnimation ?
        <div className=' w-full h-full flex flex-col justify-start py-20 items-center'>
            <Done/>
            <p className='text-3xl font-bold '>Well done captain!</p>
        </div>
        : 
        <div className='w-full h-full flex flex-col items-start py-6 gap-10'>
            <div className='text-3xl font-bold'>Complete your ride!</div>
            <div>
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
                            <i className="ri-pin-distance-fill text-xl"></i>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-xl font-bold'>Distance travelled</p>
                            <p className='text-md text-gray-600 font-semibold'>{ride.distance} KM</p>
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
            </div>
            <div className='w-full flex justify-center items-center'>
                <button className='w-full bg-green-600 text-white px-8 py-4 font-medium rounded-md flex justify-center items-center' onClick={handleCompleteRide}>Complete Ride</button>    
            </div>
        </div>
        }
    </div>   
  )
}

export default CompleteRide