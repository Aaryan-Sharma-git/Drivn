import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {captainContext} from '../context/CaptainContext'

const CaptainSignup = () => {

    const [Email, setEmail] = useState('');
      const [Password, setPassword] = useState('');
      const [Firstname, setFirstname] = useState('');
      const [Lastname, setLastname] = useState('');
      const {captain, setCaptain} = useContext(captainContext);

      const [Color, setColor] = useState('');
      const [VehicleNumber, setVehicleNumber] = useState('');
      const [Capacity, setCapacity] = useState('');
      const [VehicleType, setVehicleType] = useState('bike');

      const navigate = useNavigate();
  
      const handleCaptainFirstname = (e) => {
        setFirstname(e.target.value);
      }
  
      const handleCaptainLastname = (e) => {
        setLastname(e.target.value);
      }
    
      const handleCaptainEmail = (e) => {
        setEmail(e.target.value);
      }
    
      const handleCaptainPassword = (e) => {
        setPassword(e.target.value);
      }

      const handleVehicleColor = (e) => {
        setColor(e.target.value);
      }

      const handleVehicleNumber = (e) => {
        setVehicleNumber(e.target.value);
      }

      const handleVehicleCapacity = (e) => {
        setCapacity(e.target.value);
      }

      const handleVehicleType = (e) => {
        setVehicleType(e.target.value);
      }
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const captainData = {
          fullname: {
            firstname: Firstname,
            lastname: Lastname
          },
          email: Email,
          password: Password,
          vehicle: {
            color: Color,
            vehicleNumber: VehicleNumber,
            capacity: Capacity,
            vehicleType: VehicleType
          }
        }


        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains`, captainData, {
          withCredentials: true
        });

        if(response.status === 201){
          localStorage.setItem("token", response.data.token);
          setCaptain(response.data.captain);
          navigate('/captain-landing-page');
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setColor('');
        setVehicleNumber('');
        setCapacity('');
        setVehicleType('default');

        console.log('Registration successful!');
      }
  return (
    <div>
      <div className='w-screen h-screen p-6 flex flex-col justify-between items-center gap-10'>
        <div className='w-full'>
          <img className='w-20' src="https://pngimg.com/d/uber_PNG24.png" alt="UberIcon"/>
          <form className=' flex flex-col justify-center items-center gap-6' onSubmit={(e) => {
            handleFormSubmit(e);
          }}>
            <div className='w-full flex flex-col gap-4'>

              <div className='flex flex-col gap-2.5'>
                <p className='text-lg'>Enter your name</p>
                <div className='flex gap-4'>
                  <input className='bg-gray-200 px-6 py-4 rounded-md w-1/2 placeholder:text-md' value={Firstname} onChange={(e) => {
                    handleCaptainFirstname(e);
                  }} type="text" name="firstname" id="firstname" placeholder='Firstname'/>
                  <input className='bg-gray-200 px-6 py-4 rounded-md w-1/2 placeholder:text-md' value={Lastname} onChange={(e) => {
                    handleCaptainLastname(e);
                  }} type="text" name="lastname" id="lastname" placeholder='Lastname'/>
                </div>
              </div>

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

              <div className='flex flex-col gap-2.5'>
                <p className='text-lg'>Vehicle Information</p>
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-4'>
                    <input className='bg-gray-200 px-6 py-4 rounded-md w-1/2 placeholder:text-md' value={Color} onChange={(e) => {
                      handleVehicleColor(e);
                    }} type="text" name="color" id="color" placeholder='Color'/>
                    <input className='bg-gray-200 px-6 py-4 rounded-md w-1/2 placeholder:text-md' value={VehicleNumber} onChange={(e) => {
                      handleVehicleNumber(e);
                    }} type="text" name="vehicleNumber" id="vehicleNumber" placeholder='Vehicle Number'/>
                  </div>
                  <div className='flex gap-4'>
                    <input className='bg-gray-200 px-6 py-4 rounded-md w-1/2 placeholder:text-md' value={Capacity} onChange={(e) => {
                      handleVehicleCapacity(e);
                    }} type='number' name="capacity" id="capacity" placeholder='Capacity'/>
                    <select name="vehicleType" id="vehicleType" className='bg-gray-200 px-6 py-4 rounded-md w-1/2 test-md' value={VehicleType} onChange={(e) => {
                      handleVehicleType(e);
                    }} placeholder="choose type">
                      <option value="bike">Bike</option>
                      <option value="car">Car</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>  
              </div>

            </div>
            <button className='w-full bg-black text-white px-8 py-4 font-medium rounded-md' type="submit">Register</button>  
          </form>
          <p className=' w-full text-center mt-2 text-md'>Already have an account? <Link className='text-blue-500' to='/captain-login'>Login as Captain</Link></p>
        </div>
        <p className='text-sm'>Lorem ipsum dolor sit amet <span className='underline'>consectetur adipisicing</span> elit. Quaerat, quibusdam.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
