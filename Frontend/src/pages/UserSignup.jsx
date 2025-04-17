import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {userContext} from '../context/UserContext'

const UserSignup = () => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const {User, setUser} = useContext(userContext);
    const navigate = useNavigate();

    const handleUserFirstname = (e) => {
      setFirstname(e.target.value);
    }

    const handleUserLastname = (e) => {
      setLastname(e.target.value);
    }
  
    const handleUserEmail = (e) => {
      setEmail(e.target.value);
    }
  
    const handleUserPassword = (e) => {
      setPassword(e.target.value);
    }
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();

      const newUser = {
        fullname: {
          firstname: Firstname,
          lastname: Lastname
        },
        email: Email,
        password: Password
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, newUser, {
          withCredentials: true
        });
        console.log('Response:', response);

        if(response.status === 201){
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          navigate('/landing-page');
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');

        console.log('Registration successful!');
      } 
      
      catch (error) {
        console.log(error);
      }
    }
  return (
    <div>
      <div className='w-screen h-screen p-6 flex flex-col justify-between items-center'>
        <div className='w-full'>
          <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="UberIcon"/>
          <form className='mt-5 flex flex-col justify-center items-center gap-6' onSubmit={(e) => {
            handleFormSubmit(e);
          }}>
            <div className='w-full flex flex-col gap-4'>

              <div className='flex flex-col gap-2.5'>
                <p className='text-lg'>Enter your name</p>
                <div className='flex gap-4'>
                  <input className='bg-gray-200 px-6 py-4 rounded-md w-1/2 placeholder:text-md' value={Firstname} onChange={(e) => {
                    handleUserFirstname(e);
                  }} type="text" name="firstname" id="firstname" placeholder='Firstname'/>
                  <input className='bg-gray-200 px-6 py-4 rounded-md w-1/2 placeholder:text-md' value={Lastname} onChange={(e) => {
                    handleUserLastname(e);
                  }} type="text" name="lastname" id="lastname" placeholder='Lastname'/>
                </div>
              </div>

              <div className='flex flex-col gap-2.5'>
                <label className='text-lg' htmlFor="userEmail">Enter your email</label>
                <input className='bg-gray-200 px-6 py-4 rounded-md placeholder:text-md' value={Email} onChange={(e) => {
                  handleUserEmail(e);
                }} type="email" name="userEmail" id="userEmail" placeholder='example@email.com'/>
              </div>

              <div className='flex flex-col gap-2.5'>
                <label className='text-lg' htmlFor="userPassword">Enter your password</label>
                <input className='bg-gray-200 px-6 py-4 rounded-md placeholder:text-md' value={Password} onChange={(e) => {
                  handleUserPassword(e);    
                }} type="password" name="userPassword" id="userPassword"  placeholder='Password'/>
              </div>

            </div>
            <button className='w-full bg-black text-white font-medium rounded-md px-8 py-4' type="submit">Register</button>  
          </form>
          <p className='w-full text-center text-md mt-2'>Already have an account? <Link className='text-blue-500' to='/login'>Login as User</Link></p>
        </div>
        <p className='text-sm'>Lorem ipsum dolor sit amet <span className='underline'>consectetur adipisicing</span> elit. Quaerat, quibusdam.</p>
      </div>
    </div>
  )
}

export default UserSignup
