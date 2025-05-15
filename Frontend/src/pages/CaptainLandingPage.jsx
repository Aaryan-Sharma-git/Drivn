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
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState();

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

      let locationIntervalId;

      const updateCaptainLocation = () => {
          if (!navigator.geolocation) {
              console.log('Geolocation is not supported');
              return;
          }

          // Clear any previous interval if it exists
          if (locationIntervalId) clearInterval(locationIntervalId);

          // ⏱️ Use `getCurrentPosition()` inside a setInterval to fetch every 10 seconds
          locationIntervalId = setInterval(() => {
              navigator.geolocation.getCurrentPosition(
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
                      enableHighAccuracy: true,
                      maximumAge: 0,
                  }
              );
          }, 10000); // Every 10 seconds
      };
  
      updateCaptainLocation();  // Initial location update

      return () => {
        clearInterval(locationIntervalId);
      }
  
    }
  }, [socket]);

  useEffect(() => {
    if(socket){
      socket.on('ride-confirm', (newRide) => {
        setRides((prevRides) => {
          // check if ride already exists
          const exists = prevRides.some(ride => ride._id === newRide._id);
          if (!exists) {
            return [...prevRides, newRide];
          } else {
            return prevRides; // don't add duplicate
          }
        });
        setPopupPanel(true);
      })
    }
  },[socket]);

  return (
    <div className='w-full h-full flex flex-col overflow-hidden relative'>
      <div className='w-full relative flex-1'>
        <img src="/D2rivn-1-removebg-preview (1).png" alt="uberIcon" className='absolute top-6 left-6 w-20'/>
        <Link to='/captain/logout' className='absolute flex justify-center items-center bg-white w-[50px] h-[50px] rounded-full left-4 bottom-4 z-10'><i className="ri-logout-box-r-line text-xl"></i></Link>
        <SingleTracking/>   
      </div>
      <div className='w-full p-6'>
        <CaptainProgress setPopupPanel={setPopupPanel}/>
      </div>

      <div ref={popupPanelRef} className="absolute w-full bottom-0 max-h-[80%] translate-y-full bg-white z-10 py-6 rounded-t-2xl flex flex-col items-center overflow-hidden">

        {PopupPanel && <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
            setPopupPanel(false);
          }}><i className="ri-arrow-down-wide-line text-4xl text-gray-300"></i></div>}
        {PopupPanel &&<Popup setPopupPanel={setPopupPanel} setConfirmPopupPanel={setConfirmPopupPanel} rides={rides} setSelectedRide={setSelectedRide} setRides = {setRides} />}
      </div>

      <div ref={confirmPopupRef} className='absolute w-full h-full bottom-0 translate-y-full bg-white z-10 p-6 flex flex-col  justify-center items-center'>
        {confirmPopupPanel && <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
            setConfirmPopupPanel(false);
          }}><i className="ri-arrow-down-wide-line text-4xl text-gray-300"></i></div>}
        {confirmPopupPanel && <ConfirmPopup setPopupPanel={setPopupPanel} setConfirmPopupPanel={setConfirmPopupPanel}  ride ={selectedRide} rides={rides} setRides={setRides} />}
      </div>

    </div>
  )
}

export default CaptainLandingPage