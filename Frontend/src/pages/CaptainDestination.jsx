import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import CompleteRide from '../components/CompleteRide';
import DoubleTracking from '../components/DoubleTracking';
import axios from 'axios';


const CaptainDestination = () => {

  const [completePanel, setCompletePanel] = useState(false);
  const [destinationCoords, setDestinationCoords] = useState();

  const location = useLocation();
  const {ride} = location.state;
  const completePanelRef = useRef();

  useEffect(() => {
    async function getDestinationCoordinates() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates?address=${ride.destination}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

  
        if(response.status === 200){
            setDestinationCoords(response.data);
            console.log('got destination coords');
        }
        else{
            console.log('couldnt get dest Coords');
        }
  
      } catch (error) {
          console.log(error);
      }
    }

    getDestinationCoordinates();
  }, [])

  useGSAP(() => {
          if(completePanel){
            gsap.to(completePanelRef.current, {
              transform: "translateY(0%)"
            })
          }
          else{
            gsap.to(completePanelRef.current, {
              transform: "translateY(100%)"
            })
          }
        }, [completePanel])

  return (
    <div className='w-full h-full flex flex-col overflow-hidden relative'>
        <div className='w-full flex-1 relative'>
            {destinationCoords && <DoubleTracking destination={destinationCoords}/>}
        </div>
        <div className=' w-full p-6 relative flex flex-col gap-4 justify-evenly items-center bg-amber-400'>
            <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
                setCompletePanel(true)
            }}><i className="ri-arrow-up-wide-fill text-4xl text-gray-500"></i></div>
            <div className='flex gap-4 justify-start items-center w-full py-2'>
                <div className='flex justify-center items-center rounded-full'>
                <i className="ri-map-pin-range-fill text-xl"></i>
                </div> 
                <div className='flex flex-col'>
                    <p className='text-md text-gray-600 font-semibold'>Destination</p>
                    <p className='text-lg font-medium'>{ride.destination}</p>
                </div>
            </div>
            <div className='w-full flex justify-end items-center'>
                <button className='w-2/5 bg-green-600 text-white px-4 py-4 font-medium rounded-md flex justify-center items-center' onClick={() => {
                    setCompletePanel(true)
                }}>Complete Ride</button>
            </div>
        </div>

        <div ref={completePanelRef} className='absolute h-full w-full bottom-0 translate-y-full bg-white z-10 p-6 rounded-t-2xl flex flex-col items-center'>
          <div className='absolute w-full flex justify-center items-center top-0' onClick={() => {
            setCompletePanel(false)
          }}><i className="ri-arrow-down-wide-fill text-4xl text-gray-600"></i></div>
            {completePanel && <CompleteRide ride={ride}/>}
        </div>

    </div>
  )
}

export default CaptainDestination