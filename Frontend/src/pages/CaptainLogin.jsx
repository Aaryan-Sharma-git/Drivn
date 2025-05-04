import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {captainContext} from '../context/CaptainContext';
import {toast} from 'react-toastify'

const CaptainLogin = () => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const {Captain, setCaptain} = useContext(captainContext);
    const navigate = useNavigate();
    
  
    const handleCaptainEmail = (e) => {
      setEmail(e.target.value);
    }
  
    const handleCaptainPassword = (e) => {
      setPassword(e.target.value);
    }
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      const captainData =  {
        email: Email,
        password: Password
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData, {
          withCredentials: true
        });
  
        if(response.status === 200){
          localStorage.setItem("token", response.data.token);
          setCaptain(response.data.captain);
          navigate('/captain-landing-page');
  
          setEmail('');
          setPassword('');
      
          console.log('Login successful!');
        }
      } catch (error) {
        if (error.response?.status === 400) {
                            toast.error(error.response.data.errors[0].msg);
                          } 
                          else if (error.response?.status === 401) {
                            toast.error("Invalid email or password");
                          } 
                          else {
                            toast.error("An unexpected error occurred");
                          }
      }
    }

  return (
    <div className='w-full h-full'>
      <div className='w-full h-full p-6 flex flex-col justify-between items-center'>
        <div className='w-full'>
          <img className='w-20' src="/D2rivn-1-removebg-preview (1).png" alt="UberIcon"/>
          <form className='mt-5 flex flex-col justify-center items-center gap-6' onSubmit={(e) => {
            handleFormSubmit(e);
          }}>
            <div className='w-full flex flex-col gap-4'>

              <div className='flex flex-col gap-2.5'>
                <label className='text-lg' htmlFor="userEmail">Enter your email</label>
                <input className='bg-gray-200 px-6 py-4 rounded-md placeholder:text-md' value={Email} onChange={(e) => {
                  handleCaptainEmail(e);
                }} type="email" name="userEmail" id="userEmail" placeholder='example@email.com'/>
              </div>

              <div className='flex flex-col gap-2.5'>
                <label className='text-lg' htmlFor="userPassword">Enter your password</label>
                <input className='bg-gray-200 px-6 py-4 rounded-md placeholder:text-md' value={Password} onChange={(e) => {
                  handleCaptainPassword(e);    
                }} type="password" name="userPassword" id="userPassword"  placeholder='Password'/>
              </div>

            </div>
            <button className='w-full bg-black text-white px-6 py-4 font-medium rounded-md' type="submit">Login</button>  
          </form>
          <p className='w-full text-center text-md mt-2'>Don't have an account? <Link className='text-blue-500' to='/captain-signup'>Register as Captain</Link></p>
        </div>
        <Link to='/login' className='w-full bg-amber-600 text-white px-6 py-4 font-medium rounded-md flex justify-center items-center'>Login as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
