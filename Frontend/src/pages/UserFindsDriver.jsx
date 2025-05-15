import React, { useContext, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import DriverFoundPanel from '../components/DriverFoundPanel';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DoubleTrackingWithSocket from '../components/DoubleTrackingWithSocket';
import axios from 'axios';
import MessagingElement from '../components/MessagingElement';
import { socketContext } from '../context/SocketContextt';
import CancelRide from '../components/CancelRide';
import FindAnotherRide from '../components/FindAnotherRide';

const UserFindsDriver = () => {
  const [driverInfoPanel, setDriverInfoPanel] = useState(true);
  const [originCoords, setOriginCoords] = useState(null);
  const driverInfoPanelRef = useRef();
  const [messagePanel, setMessagePanel] = useState(false);
  const messagePanelRef = useRef();
  const [message, setMessage] = useState('');
  const [messageCollection, setMessageCollection] = useState([]); // Fixed typo
  const [messageAlert, setMessageAlert] = useState(false);
  const [cancelRideComponent, setCancelRideComponent] = useState(false);
  const [anotherRideComponent, setAnotherRideComponent] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { ride, chosenVehicle } = location.state;

  const [captainSocketId, setCaptainSocketId] = useState(ride.captain.socketId);

  const { socket } = useContext(socketContext);

  const handleMessageSend = () => {
    if (socket && message.trim()) {
      socket.emit('send-message', {
        msg: message,
        toSocket: captainSocketId,
      });
    }
  }

  const handleAnotherRide = () => {
    navigate('/landing-page');
  }

  useEffect(() => {
    if(!socket) return;

    socket.on('socketId-to-user-from-server', (socketId) => {
      setCaptainSocketId(socketId);

      socket.emit('socketId-to-captain', {
        socketId: socket.id,
        captainId: ride.captain._id
      });
    })
  },[socket])

  

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      const messageId = Date.now() + Math.random();
      setMessageCollection((prevMsg) => [
        ...prevMsg,
        { isMe: false, msg: msg, id: messageId },
      ]);
      setMessageAlert(true);
    };

    socket.on('recieve-message', handleReceiveMessage); // Register listener

    socket.on('captain-cancelled-ride', (msg) => {
      setAnotherRideComponent(true);
    })

    return () => {
      socket.off('recieve-message', handleReceiveMessage); // Clean up listener
    };
  }, [socket]); // Dependency on socket to re-register if socket changes

  useEffect(() => {
    if (!socket || !ride?.user?._id) return;
  
    // Emit 'join' event to update socketId in the backend
    socket.emit('join', {
      userType: 'user',
      userId: ride.user._id,
    });
  
    // Handle socket disconnection and reconnection
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('join', {
        userType: 'user',
        userId: ride.user._id,
      });

      socket.emit('socketId-to-captain', {
        socketId: socket.id,
        captainId: ride.captain._id
      })
    });
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [socket, ride?.user?._id]);

  useEffect(() => {
    async function getDestinationCoordinates() {
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
          setOriginCoords(response.data);
          console.log('got origin coords');
        } else {
          console.log('couldnt get dest Coords');
        }
      } catch (error) {
        console.log(error);
      }
    }

    getDestinationCoordinates();
  }, [ride.pickup]);

  const handleRideCancellation = async () => {
    try {
      const token = localStorage.getItem('token');
      const userType = 'user'
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
          navigate('/landing-page')
          console.log(response.data);
        } else {
          console.log('ride cancellation failed.');
        }
    } catch (error) {
      console.log(error);
    }
  }

  useGSAP(() => {
    if (driverInfoPanel) {
      gsap.to(driverInfoPanelRef.current, {
        transform: 'translateY(0%)',
      });
    } else {
      gsap.to(driverInfoPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [driverInfoPanel]);

  useGSAP(() => {
    if (messagePanel) {
      gsap.to(messagePanelRef.current, {
        transform: 'translateY(0%)',
      });
    } else {
      gsap.to(messagePanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [messagePanel]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      <div className="w-full flex-1">
        <DoubleTrackingWithSocket ride={ride} originCoords={originCoords} />
      </div>
      <div className="w-full p-6 relative flex flex-col gap-1 justify-evenly items-center bg-amber-400">
        <div
          className="w-full flex justify-center items-center absolute top-0"
          onClick={() => {
            setDriverInfoPanel(true);
          }}
        >
          <i className="ri-arrow-up-wide-fill text-4xl text-gray-500"></i>
        </div>
        <div className="flex justify-start items-center w-full py-2">
          <div className="flex justify-center items-center rounded-full">
            <i className="ri-arrow-right-double-fill text-4xl"></i>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-bold">Driver is on his way!</p>
          </div>
        </div>
        <div className="w-full flex gap-6 justify-between items-center">
          <button onClick={() => {
            setCancelRideComponent(true);
          }} className=" w-1/2 bg-red-600 text-white px-4 py-4 font-medium rounded-md flex justify-center items-center cursor-pointer"> Cancel ride</button>
          <button
            className="w-1/2 bg-green-600 text-white px-4 py-4 font-medium rounded-md flex justify-center items-center cursor-pointer"
            onClick={() => {
              setDriverInfoPanel(true);
            }}
          >
            Driver Info
          </button>
        </div>
      </div>

      <div
        ref={driverInfoPanelRef}
        className="absolute h-max-[80%] w-full bottom-0 translate-y-full bg-white z-10 p-6 rounded-t-2xl flex flex-col items-center"
      >
        <div
          className="absolute w-full flex justify-center items-center top-0"
          onClick={() => {
            setDriverInfoPanel(false);
          }}
        >
          <i className="ri-arrow-down-wide-fill text-4xl text-gray-600"></i>
        </div>
        {driverInfoPanel && <DriverFoundPanel
          ride={ride}
          chosenVehicle={chosenVehicle}
          setMessagePanel={setMessagePanel}
          messageAlert={messageAlert}
          setMessageAlert={setMessageAlert}
        />}
      </div>

      <div
        ref={messagePanelRef}
        className="absolute h-full w-full bottom-0 translate-y-full bg-white z-10 p-6 rounded-t-2xl flex flex-col items-center"
      >
        <div
          className="absolute w-full flex justify-center items-center top-0"
          onClick={() => {
            setMessagePanel(false);
            setMessageAlert(false)
          }}
        >
          <i className="ri-arrow-down-wide-fill text-4xl text-gray-600"></i>
        </div>
        {messagePanel && <MessagingElement
          setMessage={setMessage}
          message={message}
          handleMessageSend={handleMessageSend}
          setMessageCollection={setMessageCollection} // Fixed typo
          messageCollection={messageCollection}
        />}
      </div>

      {cancelRideComponent && <div className='w-full h-full absolute'>
        <CancelRide setCancelRideComponent={setCancelRideComponent} handleRideCancellation={handleRideCancellation}/>
      </div>}

      {anotherRideComponent && <div className='w-full h-full absolute'>
        <FindAnotherRide handleAnotherRide={handleAnotherRide}/>
      </div>}

    </div>
  );
};

export default UserFindsDriver;