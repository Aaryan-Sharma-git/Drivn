import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import MessagingElement from '../components/MessagingElement';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { socketContext } from '../context/SocketContextt';
import OtpPanel from '../components/OtpPanel';
import axios from 'axios';
import DoubleTracking from '../components/DoubleTracking';
import CancelRide from '../components/CancelRide';
import FindAnotherRide from '../components/FindAnotherRide';

const CaptainPickup = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {ride} = location.state;

  const [messagePanel, setMessagePanel] = useState(false);
  const [message, setMessage] = useState('');
  const [messageCollection, setMessageCollection] = useState([]);
  const [messageAlert, setMessageAlert] = useState(false);
  const [userSocketId, setUserSocketId] = useState(ride.user.socketId);
  const [otpPanel, setOtpPanel] = useState(false);
  const [pickupCoords, setPickupCoords] = useState();
  const [cancelRideComponent, setCancelRideComponent] = useState(false);
  const [anotherRideComponent, setAnotherRideComponent] = useState(false);

  const messagePanelRef = useRef();
  const otpPanelRef = useRef();

  const {socket} = useContext(socketContext);

  useEffect(() => {
    if(!socket){
      return;
    }

    socket.emit('join', {
      userType: 'captain',
      captainId: ride.captain._id,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('join', {
        userType: 'captain',
        captainId: ride.captain._id,
      });

      socket.emit('socketId-to-user', {
        socketId: socket.id,
        userId: ride.user._id
      })
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    const handleReceiveMessage = (msg) => {
      const messageId = Date.now() + Math.random();
      setMessageCollection((prevMsg) => [
        ...prevMsg,
        { isMe: false, msg: msg, id: messageId },
      ]);
      setMessageAlert(true);
    };

    socket.on('recieve-message', handleReceiveMessage);

    const handleSetSocketId = (socketId) => {
      setUserSocketId(socketId);

      socket.emit('socketId-to-user', {
        socketId: socket.id,
        userId: ride.user._id
      });
    }

    socket.on('socketId-to-captain-from-server', handleSetSocketId)

    socket.on('user-cancelled-ride', (msg) => {
      setAnotherRideComponent(true);
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('recieve-message', handleReceiveMessage);
      socket.off('socketId-to-captain-from-server', handleSetSocketId);
      socket.off('user-cancelled-ride');
    }
  }, [socket])

  useEffect(() => {
    const handleGetCoordinates = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates?address=${ride.pickup}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          setPickupCoords(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleGetCoordinates();
  }, [ride.pickup]);

  const handleMessageSend = () => {
    if (socket && message.trim()) {
      socket.emit('send-message', {
        msg: message,
        toSocket: userSocketId,
      });
    }
  };

  const handleAnotherRide = () => {
    navigate('/captain-landing-page');
  }

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(ride.user.phoneNumber).then(() => {
      toast.success('Contact number copied!');
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleRideCancellation = async () => {
    try {
      const token = localStorage.getItem('token');
      const userType = 'captain'
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/cancel-ride?rideId=${ride._id}&userType=${userType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          navigate('/captain-landing-page');
          console.log(response.data);
        } else {
          console.log('ride cancellation failed.');
        }
    } catch (error) {
      console.log(error);
    }
  }

  useGSAP(() => {
    if(messagePanelRef.current){
      if (messagePanel) {
        gsap.to(messagePanelRef.current, {
          transform: 'translateY(0%)',
        });
      } else {
        gsap.to(messagePanelRef.current, {
          transform: 'translateY(100%)',
        });
      }
    }
  }, [messagePanel]);

  useGSAP(() => {
    if(otpPanelRef.current){
      if (otpPanel) {
        gsap.to(otpPanelRef.current, {
          transform: 'translateY(0%)',
        });
      } else {
        gsap.to(otpPanelRef.current, {
          transform: 'translateY(100%)',
        });
      }
    }
  }, [otpPanel]);

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      <div className='w-full bg-white flex-1'>
        {pickupCoords && <DoubleTracking destination={pickupCoords} />}
      </div>
      <div className='w-full flex flex-col items-center bg-amber-400 p-6 relative gap-6'>
        <div className='absolute top-0 w-full flex justify-center items-center'>
          <i onClick={() => {
            setOtpPanel(true)
            setMessagePanel(false)
          }} className="ri-arrow-up-wide-fill text-4xl text-gray-500 cursor-pointer"></i>
        </div>
        <div className='flex items-center gap-4 w-full mt-4'>
          <div className='flex justify-center items-center w-[50px] h-[50px] rounded-full bg-amber-400 flex-shrink-0'>
            <i className="ri-map-pin-range-fill text-xl"></i>
          </div>
          <div className='flex flex-col'>
            <div className='text-md text-gray-600 font-semibold'>Pickup</div>
            <div className='text-lg font-medium'>{ride.destination}</div>
          </div>
        </div>
        <div className='w-full flex gap-6 items-center'>
            <div onClick={handleCopyNumber} role='button' className='flex justify-center items-center w-[50px] h-[50px] rounded-full bg-amber-300 flex-shrink-0 cursor-pointer'><i className="ri-phone-fill text-2xl"></i></div>
            <div onClick={(e) => {
              e.stopPropagation();
              setOtpPanel(false)
              setMessagePanel(true);
              setMessageAlert(false)
            }} role='button' className='flex justify-center items-center w-[50px] h-[50px] rounded-full bg-amber-300 flex-shrink-0 cursor-pointer relative'><i className="ri-message-2-fill text-2xl"></i>
            {messageAlert && <div className='bg-red-600 w-[12px] h-[12px] rounded-full absolute top-0 right-0'></div>}
            </div>
        </div>
        <div className='w-full flex justify-center items-center gap-6'>
            <button onClick={() => {
              setCancelRideComponent(true);
            }} className="w-1/2 bg-red-600 text-white px-4 py-4 font-medium rounded-md flex justify-center items-center cursor-pointer"> Cancel ride</button>
            <button onClick={(e) => {
              setOtpPanel(true);
              setMessagePanel(false);
              e.stopPropagation();
            }} className='w-1/2 bg-green-600 text-white px-4 py-4 font-medium rounded-md flex justify-center items-center cursor-pointer'>Enter OTP</button>
          </div>
      </div>

      {messagePanel && <div ref={messagePanelRef} className='absolute bottom-0 flex flex-col items-center bg-white w-full h-full rounded-t-2xl translate-y-full z-20'>
        <div className='w-full flex justify-center items-center'>
          <i className="ri-arrow-down-wide-fill text-4xl text-gray-500 cursor-pointer" onClick={() => {
            setMessagePanel(false);
            setMessageAlert(false)
          }}></i>
        </div>
        <div className='flex-1 w-full px-6 pb-6'>
          <MessagingElement
          setMessage={setMessage}
          message={message}
          setMessageCollection={setMessageCollection}
          messageCollection={messageCollection}
          handleMessageSend={handleMessageSend}/>
        </div>
      </div>}

      {otpPanel && <div ref={otpPanelRef} className='absolute bottom-0 flex flex-col items-center bg-white w-full h-full rounded-t-2xl translate-y-full z-10 overflow-hidden'>
        <div className='w-full flex justify-center items-center'>
          <i className="ri-arrow-down-wide-fill text-4xl text-gray-500 cursor-pointer" onClick={() => {
            setOtpPanel(false)
          }}></i>
        </div>
        <div className='flex-1 w-full p-6'>
          <OtpPanel otpPanel={otpPanel} ride={ride}/>
        </div>
      </div>}

      {cancelRideComponent && <div className='w-full h-full absolute'>
        <CancelRide setCancelRideComponent={setCancelRideComponent} handleRideCancellation={handleRideCancellation}/>
      </div>}

      {anotherRideComponent && <div className='w-full h-full absolute'>
        <FindAnotherRide handleAnotherRide={handleAnotherRide}/>
      </div>}

    </div>
  )
}

export default CaptainPickup