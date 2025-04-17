import React, { useContext } from 'react'
import {captainContext} from '../context/CaptainContext'

const CaptainProgress = () => {

    const {Captain, setCaptain} = useContext(captainContext);

  return (
    <div className='w-full h-full flex flex-col gap-6 justify-evenly items-center'>
        <div className='w-full flex justify-between items-center'>
            <div className='flex justify-start items-center gap-2'>
                <img className='w-[60px] h-[60px] rounded-full object-cover object-center' src="https://media.istockphoto.com/id/464565934/photo/smiling-south-asian-bearded-male.jpg?s=612x612&w=0&k=20&c=uKyudyjQOAiqccBZ73UTgC944AA26iY1Z4VADwKmNH0=" alt="" />
                <p className='text-xl font-bold capitalize'>{Captain.fullname.firstname+' '+Captain.fullname.lastname}</p>
            </div>
            <div className='flex flex-col justify-center items-start'>
                <p className='text-2xl font-bold'><span>&#8377;</span>295.20</p>
                <p  className='text-md text-gray-600'>Earned</p>
            </div>
        </div>
        <div className='flex justify-center items-center w-full'>
            <div className='flex justify-between gap-4 bg-gray-200 p-4 w-full rounded-2xl'>
                <div className='flex flex-col justify-between items-center'>
                    <i className="ri-time-line text-3xl font-medium"></i>
                    <p className='text-xl font-bold'>10.2</p>
                    <p className='text-gray-600'>Hours Online</p>
                </div>
                <div className='flex flex-col justify-between items-center'>
                    <i className="ri-speed-up-fill text-3xl font-medium"></i>
                    <p className='text-xl font-bold'>30 KM</p>
                    <p className='text-gray-600'>Total Distance</p>
                </div>
                <div className='flex flex-col justify-between items-center'>
                    <i className="ri-booklet-line text-3xl font-medium"></i>
                    <p className='text-xl font-bold'>20</p>
                    <p className='text-gray-600'>Total Jobs</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CaptainProgress