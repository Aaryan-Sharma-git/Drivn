import React, { useContext, useEffect, useRef, useState } from 'react'
import CaptainProgress from '../components/CaptainProgress'
import { Link } from 'react-router-dom'
import Popup from '../components/Popup'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";
import ConfirmPopup from '../components/ConfirmPopup';
import {socketContext} from '../context/SocketContextt'
import {captainContext} from '../context/CaptainContext';
import SingleTracking from '../components/SingleTracking'

const CaptainLandingPage = () => {

  const [PopupPanel, setPopupPanel] = useState(false);
  const [confirmPopupPanel, setConfirmPopupPanel] = useState(false);
  const [ride, setRide] = useState({});

  const popupPanelRef = useRef();
  const confirmPopupRef = useRef();

  const {socket} = useContext(socketContext);
  const {Captain, setCaptain} = useContext(captainContext);


  useGSAP(() => {
    if(PopupPanel){
      gsap.to(popupPanelRef.current, {
        transform: "translateY(0%)"
      })
    }
    else{
      gsap.to(popupPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [PopupPanel])

  useGSAP(() => {
    if(confirmPopupPanel){
      gsap.to(confirmPopupRef.current, {
        transform: "translateY(0%)"
      })
    }
    else{
      gsap.to(confirmPopupRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmPopupPanel]);

  useEffect(() => {
    if(socket){
      socket.emit('join', {
        userType: 'captain',
        captainId: Captain._id
      })

      let watchId = null;

      const updateCaptainLocation = () => {
          if (!navigator.geolocation) {
              console.log('Geolocation is not supported');
              return;
          }
  
          // 🛰️ Use `watchPosition()` to continuously track movement
          watchId = navigator.geolocation.watchPosition(
              (position) => {
                  console.log("Updated Location:", position.coords.latitude, position.coords.longitude);
  
                  socket.emit('update-captain-location', {
                      captainId: Captain._id,
                      location: {
                          lat: position.coords.latitude, 
                          lng: position.coords.longitude  
                      }
                  });
              },
              (error) => console.error("Geolocation Error:", error),
              {
                  enableHighAccuracy: true,  // Get precise location
                  maximumAge: 0,  // Prevent using cached locations
              }
          );
      };
  
      updateCaptainLocation();  // Initial location update
  
    }
  }, [socket]);

  useEffect(() => {
    if(socket){
      socket.on('ride-confirm', (ride) => {
        setRide(ride)
        setPopupPanel(true);
      })
    }
  },[socket]);

  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden relative'>
      <div className='w-full relative flex-1'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="uberIcon" className='absolute top-6 left-6 w-20'/>
        <Link to='/captain/logout' className='absolute flex justify-center items-center bg-white w-[50px] h-[50px] rounded-full left-4 bottom-4 z-10'><i className="ri-logout-box-r-line text-xl"></i></Link>
        <SingleTracking/>   

      </div>
      <div className='w-full p-6'>
        <CaptainProgress/>
      </div>

      <div ref={popupPanelRef} className='absolute w-full bottom-0 translate-y-full bg-white z-10 p-6 rounded-t-2xl flex flex-col justify-center items-center'>
        {PopupPanel && <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
            setPopupPanel(false);
          }}><i className="ri-arrow-down-wide-line text-4xl text-gray-300"></i></div>}
        {PopupPanel &&<Popup setPopupPanel={setPopupPanel} setConfirmPopupPanel={setConfirmPopupPanel} ride={ride} />}
      </div>

      <div ref={confirmPopupRef} className='absolute w-full h-full bottom-0 translate-y-full bg-white z-10 p-6 flex flex-col  justify-center items-center'>
        {confirmPopupPanel && <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
            setConfirmPopupPanel(false);
          }}><i className="ri-arrow-down-wide-line text-4xl text-gray-300"></i></div>}
        {confirmPopupPanel && <ConfirmPopup setPopupPanel={setPopupPanel} setConfirmPopupPanel={setConfirmPopupPanel} ride={ride} />}
      </div>

    </div>
  )
}

export default CaptainLandingPage