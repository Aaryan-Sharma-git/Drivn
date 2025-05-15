import React, { useState } from 'react'
import OtpTextarea from './OtpTextarea'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const OtpPanel = ({otpPanel, ride}) => {

  const [errorBox, setErrorBox] = useState(false);

  const navigate = useNavigate();

  const handleOtpSubmit = async (otp) => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/verify-otp`, {
        otp: otp,
        ride: ride
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if(response.status === 200){
        navigate('/captain-destination', {
          state: {
            ride: response.data.ride
          }
        });
      }
      else{
        setErrorBox(true);
      }
    } catch (error) {
      console.log('enter a valid otp')
    }  
  }

  return (
    <div className="w-full h-full flex flex-col justify-start gap-6 z-20 overflow-auto">
      <p className="text-2xl text-center font-bold">Enter OTP sent to the passenger</p>
        <div className="w-full flex justify-center items-center">
          <OtpTextarea length={4} handleOtpSubmit={handleOtpSubmit} />
        </div>
      {errorBox && (
        <div className="text-center text-red-600 text-md">
          Invalid OTP. Please enter the correct OTP again.
        </div>
      )}
    </div>
  )
}

export default OtpPanel