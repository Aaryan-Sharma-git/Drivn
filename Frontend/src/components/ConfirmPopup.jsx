import React, { useContext } from 'react'
import axios from 'axios';
import {captainContext} from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom';

const ConfirmPopup = ({setConfirmPopupPanel, setPopupPanel, ride, rides, setRides}) => {

    const {Captain, setCaptain} = useContext(captainContext);
    const navigate = useNavigate();

    async function handleConfirmPopup() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-popup`, {
                captainId : Captain._id,
                rideId: ride._id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if(response.status === 200){
                navigate('/captain-pickup', {state: {
                    ride: response.data.ride
                }});
                console.log('popup confirmed');
            }
            else{
                console.log('popup not confirmed');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDecline = (rideId) => {
        const updatedRides = rides.filter(ride => ride._id !== rideId);
        setRides(updatedRides);

        if(updatedRides.length === 0){
            setPopupPanel(false);
        }
    } 

  return (
    <div className='w-full flex flex-col justify-start h-full gap-6 pt-4'>
            <p className='text-3xl font-bold'>Confirm your ride!</p>
            <div className='flex flex-col w-full gap-4'>
                <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                    <div className='flex justify-center items-center rounded-full'>
                        <i className="ri-money-rupee-circle-fill text-xl"></i>
                    </div> 
                    <div className='flex flex-col'>
                        <p className='text-md text-gray-600 font-semibold'>Mode of Payment</p>
                        <p className='text-lg font-medium'>Cash</p>
                    </div>
                </div>
                <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                    <div className='flex ju`stify-center items-center rounded-full'>
                        <i className="ri-bill-fill text-xl"></i>
                    </div> 
                    <div className='flex flex-col w-full gap-2'>
                        <p className='text-md text-gray-600 font-semibold'>Total Bill</p>
                        <div className='w-full flex flex-col'>
                            <div className='flex justify-between'>
                                <p className='font-medium'>To Uber</p>
                                <p className='font-medium'><span>&#8377;</span>{Math.floor(ride.fare*0.3)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='font-medium'>Captain's Profit</p>
                                <p className='font-medium'><span>&#8377;</span>{Math.ceil(ride.fare*0.7)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='font-medium'>Total</p>
                                <p className='font-medium'><span>&#8377;</span>{ride.fare}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-end items-center gap-4'>
                <button onClick={() => {
                    setConfirmPopupPanel(false);
                    handleDecline(ride._id)
                }} className='w-1/2 bg-red-600 text-white px-8 py-4 font-medium rounded-md flex justify-center items-center'>Decline</button>
                <button onClick={handleConfirmPopup} className='w-1/2 bg-green-600 text-white px-8 py-4 font-medium rounded-md flex justify-center items-center'>Accept</button>
            </div>  
    </div>
  )
}

export default ConfirmPopup