import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {userContext} from '../context/UserContext'
import {toast} from 'react-toastify'

const UserLogin = () => {

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const {User, setUser} = useContext(userContext);
  const navigate = useNavigate();

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try{
    const userData = {
      email: Email,
      password: Password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData, {
      withCredentials: true
    })

    if(response.status === 200){
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate('/landing-page');
      setEmail('');
      setPassword('');

      console.log('Login successful!');
    }
    }
    catch(error){
      if (error.response?.status === 400) {
        toast.error(error.response.data.errors[0].msg); // e.g., "Password must contain at least 8 characters"
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
          <img className='w-20' src="/Drivn-1-removebg-preview (1).png" alt="UberIcon"/>
          <form className='mt-5 flex flex-col justify-center items-center gap-6' onSubmit={(e) => {
            handleFormSubmit(e);
          }}>
            <div className='w-full flex flex-col gap-4'>
              <div className='flex flex-col gap-2.5'>
                <label className='text-lg' htmlFor="userEmail">Enter your email</label>
                <input className='bg-gray-200 px-6 py-4 rounded-md placeholder:text-md' value={Email} onChange={(e) => {
                  handleUserEmail(e);
                }} type="email" name="userEmail" id="userEmail" placeholder='example@email.com' autoComplete='email'/>
              </div>

              <div className='flex flex-col gap-2.5'>
                <label className='text-lg' htmlFor="userPassword">Enter your password</label>
                <input className='bg-gray-200 w-full px-6 py-4 rounded-md placeholder:text-md' value={Password} onChange={(e) => {
                  handleUserPassword(e);    
                }} type="password" name="userPassword" id="userPassword"  placeholder='Password' autoComplete='current-password'/>
              </div>

            </div>
            <button className='w-full bg-black text-white px-8 py-4 font-medium rounded-md' type="submit">Login</button>  
          </form>

          <p className=' w-full text-center mt-2'>Don't have an account? <Link className='text-blue-500 text-md' to='/signup'>Create account</Link></p>
        </div>
        <Link to='/captain-login' className='w-full bg-green-600 text-white px-8 py-4 font-medium rounded-md flex justify-center items-center'>Login as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin
