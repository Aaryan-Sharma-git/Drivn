import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import DoubleTracking from '../components/DoubleTracking';
import RidingPanel from '../components/RidingPanel';
import axios from 'axios';
import {socketContext} from '../context/SocketContextt';


const Riding = () => {

  const [RidingPanelOpen, setRidingPanelOpen] = useState(false);
  const [destinationCoords, setDestinationCoords] = useState();
  const {socket} = useContext(socketContext)

  const ridingRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  const {ride} = location.state;

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
  
          
          console.log(response.data);
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
            if(RidingPanelOpen){
              gsap.to(ridingRef.current, {
                transform: "translateY(0%)"
              })
            }
            else{
              gsap.to(ridingRef.current, {
                transform: "translateY(100%)"
              })
            }
          }, [RidingPanelOpen])

  socket.on('complete-ride', (msg) => {
      navigate('/landing-page');
  });


  return (
    <div className='w-full h-full relative flex flex-col overflow-hidden'>
        <div className='relative w-full flex-1'>
          <Link to='/landing-page' className='absolute flex justify-center items-center bg-white w-[50px] h-[50px] rounded-full left-4 bottom-4 z-10'><i className="ri-home-9-fill text-xl"></i></Link>
          {destinationCoords && <DoubleTracking destination={destinationCoords}/>}
        </div>

        <div className=' w-full p-6 relative flex flex-col gap-4 justify-evenly items-center bg-amber-400'>
            <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
                setRidingPanelOpen(true)
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
                    setRidingPanelOpen(true)
                }}>Ride info</button>
            </div>
        </div>
        
        <div ref={ridingRef} className='absolute h-full w-full bottom-0 translate-y-full bg-white z-10 p-6 rounded-t-2xl flex flex-col items-center'>
        <div className='absolute w-full flex justify-center items-center top-0' onClick={() => {
            setRidingPanelOpen(false)
          }}><i className="ri-arrow-down-wide-fill text-4xl text-gray-600"></i></div>
           <RidingPanel ride={ride} />
        </div>
    </div>
  )
}

export default Riding