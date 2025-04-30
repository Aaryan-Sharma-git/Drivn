import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import OtpPanel from '../components/OtpPanel';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import axios from 'axios';
import DoubleTracking from '../components/DoubleTracking';

const CaptainPickup = () => {

    const [otpPanel, setOtpPanel] = useState(false);
    const [pickupCoords, setPickupCoords] = useState();
    const location = useLocation();

    const {ride} = location.state;

    const otpPanelRef = useRef();

    useGSAP(() => {
        if(otpPanel){
          gsap.to(otpPanelRef.current, {
            transform: "translateY(0%)"
          })
        }
        else{
          gsap.to(otpPanelRef.current, {
            transform: "translateY(100%)"
          })
        }
      }, [otpPanel])

      useEffect(() => {
        const handleGetCoordinates = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates?address=${ride.pickup}`, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  },
                  withCredentials: true
                })
  
                if(response.status === 200){
                  console.log(response.data);
                  setPickupCoords(response.data)
                }
  
          } catch (error) {
              console.log(error);
          }
      }

      handleGetCoordinates();
      }, []);

  return (
    <div className='w-full h-full flex flex-col overflow-hidden relative'>
        <div className='w-full flex-1 relative'>
            <Link to='/captain-landing-page' className='absolute flex justify-center items-center bg-white w-[50px] h-[50px] rounded-full left-4 bottom-4 z-10'><i className="ri-home-4-line text-xl"></i></Link>
            {pickupCoords && <DoubleTracking destination={pickupCoords}/>}
        </div>
        <div className='w-full p-6 relative flex flex-col gap-4 justify-evenly items-center bg-amber-400'>
            <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
                setOtpPanel(true);
            }}><i className="ri-arrow-up-wide-fill text-4xl text-gray-500"></i></div>
            <div className='flex gap-4 justify-start items-center w-full py-2'>
                <div className='flex justify-center items-center rounded-full'>
                <i className="ri-map-pin-range-fill text-xl"></i>
                </div> 
                <div className='flex flex-col'>
                    <p className='text-md text-gray-600 font-semibold'>Pick up</p>
                    <p className='text-lg font-medium'>{ride.pickup}</p>
                </div>
            </div>
            <div className='w-full flex justify-end items-center'>
                <button className='w-1/3 bg-green-600 text-white px-4 py-4 font-medium rounded-md flex justify-center items-center' onClick={() => {
                    setOtpPanel(true);
                }}>Enter OTP</button>
            </div>
        </div>

        <div ref={otpPanelRef} className='absolute h-full w-full bottom-0 translate-y-full bg-white z-10 p-6 rounded-t-2xl flex flex-col items-center'>
          <div className='absolute w-full flex justify-center items-center top-0' onClick={() => {
          setOtpPanel(false)
          }}><i className="ri-arrow-down-wide-fill text-4xl text-gray-600"></i></div>
          <OtpPanel otpPanel={otpPanel} ride={ride} />
        </div>

    </div>
  )
}

export default CaptainPickup