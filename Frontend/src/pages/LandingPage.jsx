import React, { useRef, useState, useEffect, useContext } from 'react'
import LocationPanel from '../components/LocationPanel';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import WaitingForDriver from '../components/WaitingForDriver';
import DriverFoundPanel from '../components/DriverFoundPanel';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {userContext} from '../context/UserContext'
import {socketContext} from '../context/socketContext'
import SingleTracking from '../components/SingleTracking';

gsap.registerPlugin(useGSAP);

const LandingPage = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [openPanel, setOpenPanel] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [chosenVehicle, setChosenVehicle] = useState('');
  const [waitingForDriverPanelOpen, setWaitingForDriverPanelOpen] = useState(false);
  const [driverFoundPanelOpen, setDriverFoundPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [otp, setOtp] = useState(null);
  const [ride, setRide] = useState({});

  const lowerBoxRef = useRef();
  const vehiclePanelRef = useRef();
  const confirmRidePanelRef = useRef();
  const waitingForDriverPanelRef = useRef();
  const driverFoundPanelRef = useRef();
  const destinationInput = useRef();
  const pickupInput = useRef();

  const {socket} = useContext(socketContext)
  const {User, setUser} = useContext(userContext)

  const navigate = useNavigate();


  useGSAP(() => {
    if (openPanel) {
      gsap.to(lowerBoxRef.current, {
        bottom: "0%",
        duration: 0.5
      });
    } else {
      gsap.to(lowerBoxRef.current, {
        bottom: "-70%",
        duration: 0.5
      });
    }
  }, [openPanel]);

  useGSAP(() => {
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)"
      })
    }
    else{
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(() => {
    if(confirmRidePanelOpen){
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0%)"
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePanelOpen])

  useGSAP(() => {
    if(waitingForDriverPanelOpen){
      gsap.to(waitingForDriverPanelRef.current, {
        transform: "translateY(0%)"
      })
    }
    else{
      gsap.to(waitingForDriverPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [waitingForDriverPanelOpen])

  useGSAP(() => {
    if(driverFoundPanelOpen){
      gsap.to(driverFoundPanelRef.current, {
        transform: "translateY(0%)"
      })
    }
    else{
      gsap.to(driverFoundPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [driverFoundPanelOpen])


  useEffect(() => {
    const suggestions = async () => {

      if(activeField){
        const token = localStorage.getItem("token");
        try {
          const array = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${pickup}`,{
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          });

          setSuggestionArray(array.data);

        } catch (error) {
          console.log(error);
        }
      }
    }

    suggestions();
  }, [pickup])

  useEffect(() => {
    const suggestions = async () => {

      if(activeField){
        const token = localStorage.getItem("token");
        try {
          const array = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${destination}`,{
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          });

          setSuggestionArray(array.data);

        } catch (error) {
          console.log(error);
        }
      }
    }

    suggestions();
  }, [destination]);

    const getFare = async () => {

      const token = localStorage.getItem('token');
      try {

        if(!pickup || !destination){
          return null;
        }

        const fare = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/fare?initial=${pickup}&final=${destination}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        setFare(fare.data.fare);

      } catch (error) {
        console.log(error);
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
  
      if(!pickup || !destination){
        console.log('All fields are required');
        return;
      }
      
      getFare();
      setVehiclePanelOpen(true);
      setOpenPanel(false);
    }

  useEffect(() => {
    if(socket){
      socket.emit('join', {
        userType: 'user',
        userId: User._id
      })
    }
    else{
      console.log('no socket');
    }
    
  }, [User])

  socket.on('confirm-popup', (ride) => {
    setRide(ride);

    setWaitingForDriverPanelOpen(false);
    setDriverFoundPanelOpen(true);
  });

  socket.on('otp-verified', (ride) => {
    navigate('/riding', {state: { ride: ride }});
  })


  return (
    <div className='w-screen h-screen relative overflow-hidden flex flex-col justify-between'>
      <div className='relative h-[70%] w-full'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="uberIcon" className='absolute top-6 left-6 w-20'/>
        <Link to='/user/logout' className='absolute flex justify-center items-center bg-white w-[50px] h-[50px] rounded-full left-4 bottom-4 z-6'><i className="ri-logout-box-r-line text-xl"></i></Link>
        <SingleTracking/>
      </div>

        <div ref={lowerBoxRef} className='bg-white absolute h-full w-full p-6 flex flex-col justify-start items-center gap-2 rounded-t-2xl bottom-[-70%] z-8'>
        {openPanel ? (
          <div className='w-full absolute top-0 flex justify-center items-center'>
            <i className="ri-arrow-down-wide-fill text-4xl text-gray-300" onClick={() => {
            setOpenPanel(false);
          }}></i>
          </div>
        ) : <div className='w-full absolute top-0 flex justify-center items-center'>
          <i className="ri-arrow-up-wide-line text-4xl text-gray-300" onClick={() => {
              setOpenPanel(true);
            }}></i>
        </div>}
          <div className='w-full flex flex-col gap-4 py-4'>
            <p className='text-2xl font-bold w-full'>Find your way</p>
            <form  className='flex flex-col gap-4 w-full' onSubmit={(e) => {handleSubmit(e)}}>
                <input ref={pickupInput} type="text" name="pickup" id="pickup" className='bg-gray-200 px-6 py-4 rounded-md placeholder:text-md w-full' placeholder='Enter your pickup location' value={pickup} onChange={(e) => {
                  setPickup(e.target.value);
                }} onClick={(e) => {
                  setOpenPanel(true);
                }} onFocus={() => {
                  setActiveField(pickupInput.current)
                }}/>
                <input ref={destinationInput} type="text" name="destination" id="destination" className='bg-gray-200 px-6 py-4 rounded-md placeholder:text-md w-full' placeholder='Enter your destination' value={destination} onChange={(e) => {
                  setDestination(e.target.value);
                }} onClick={(e) => {
                  setOpenPanel(true);
                }} onFocus={() => {
                  setActiveField(destinationInput.current);
                }}/>
              {openPanel && <button className='w-full bg-black text-white px-8 py-4 font-medium rounded-md flex justify-center items-center'>Find Ride</button>} 
            </form>
          </div>
          <div  className='w-full h-[0%] bg-white'>
            {openPanel && <LocationPanel value={{
              setOpenPanel: setOpenPanel,
              setVehiclePanelOpen: setVehiclePanelOpen,
              suggestionArray: suggestionArray,
              setPickup: setPickup,
              setDestination: setDestination,
              destinationInput: destinationInput,
              pickupInput: pickupInput,
              activeField: activeField,
              setSuggestionArray: setSuggestionArray,
              setActiveField: setActiveField
            }}/>}
          </div>
        </div>
        

      <div ref={vehiclePanelRef} className='absolute w-full bottom-0 translate-y-full bg-white z-10 p-6 rounded-t-2xl flex flex-col justify-center items-center'>
        <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
            setVehiclePanelOpen(false);
          }}><i className="ri-arrow-down-wide-line text-4xl text-gray-300"></i></div>

          {vehiclePanelOpen && <VehiclePanel fare={fare} setConfirmRidePanelOpen={setConfirmRidePanelOpen} setChosenVehicle={setChosenVehicle} setVehicleType={setVehicleType} />}
      </div>
      
      <div ref={confirmRidePanelRef} className='absolute w-full bottom-0 translate-y-full bg-white z-12 p-6 rounded-t-2xl flex flex-col justify-center items-center'>
        <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
                setConfirmRidePanelOpen(false);
            }}><i className="ri-arrow-down-wide-line text-4xl text-gray-300"></i></div>
        {confirmRidePanelOpen && <ConfirmRidePanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} chosenVehicle={chosenVehicle} setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} setDriverFoundPanelOpen={setDriverFoundPanelOpen} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setOtp={setOtp} />}
      </div>

      <div ref={waitingForDriverPanelRef} className='absolute w-full bottom-0 translate-y-full bg-white z-14 p-6 rounded-t-2xl flex flex-col justify-center items-center'>
        {waitingForDriverPanelOpen && <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
                setWaitingForDriverPanelOpen(false);
            }}><i className="ri-arrow-down-wide-line text-4xl text-gray-300"></i></div>}
        {waitingForDriverPanelOpen && <WaitingForDriver chosenVehicle={chosenVehicle} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType}/>}
      </div>


      <div ref={driverFoundPanelRef} className='absolute w-full bottom-0 translate-y-full bg-white z-16 p-6 rounded-t-2xl flex flex-col justify-center items-center'>
        <div className=' w-full flex justify-center items-center absolute top-0' onClick={() => {
                setDriverFoundPanelOpen(false);
            }}><i className="ri-arrow-down-wide-line text-4xl text-gray-300"></i></div>
        {driverFoundPanelOpen && <DriverFoundPanel chosenVehicle={chosenVehicle} setDriverFoundPanelOpen={setDriverFoundPanelOpen} otp={otp} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} ride={ride} />}
      </div>
    </div>
  )
}

export default LandingPage