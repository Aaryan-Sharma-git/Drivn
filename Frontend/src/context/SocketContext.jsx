import React, { createContext, useContext, useEffect } from 'react'
import { io } from "socket.io-client";

const socketContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true
});

const SocketContext = ({children}) => {

    useEffect(() => {

      socket.on('connect', () => {
        console.log(`${socket.id} connected to server`);
      });

      socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected from server`);
      })

    }, []);


  return (
    <div>
        <socketContext.Provider value = {{socket}}>
            {children}
        </socketContext.Provider>
    </div>
  )
}

export default SocketContext
export {socketContext}  