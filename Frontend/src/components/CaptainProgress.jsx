import React, { useContext } from 'react'
import {captainContext} from '../context/CaptainContext'

const CaptainProgress = ({setPopupPanel}) => {

    const {Captain, setCaptain} = useContext(captainContext);

  return (
    <div className='w-full h-full flex flex-col gap-6 justify-evenly items-center'>
        <div className='w-full flex justify-between items-center'>
            <div className='flex justify-start items-center gap-2'>
                <img className='w-[60px] h-[60px] rounded-full object-cover object-center' src={Captain.profilePic} alt="" />
                <p className='text-xl font-bold capitalize'>{Captain.fullname.firstname+' '+Captain.fullname.lastname}</p>
            </div>
            <div className='flex flex-col justify-center items-start'>
                <p className='text-2xl font-bold'><span>&#8377;</span>{Captain.captainProgress.amountEarned}</p>
                <p  className='text-md text-gray-600'>Earned</p>
            </div>
        </div>
        <div className='flex justify-center items-center w-full'>
            <div className='flex justify-between gap-4 bg-gray-200 p-4 w-full rounded-2xl'>
                <div className='flex flex-col justify-between items-center'>
                    <i className="ri-time-line text-3xl font-medium"></i>
                    <p className='text-xl font-bold text-center'>{(Captain.captainProgress.timeWorked).toFixed(2)}</p>
                    <p className='text-gray-600 text-center'>Hours Online</p>
                </div>
                <div className='flex flex-col justify-between items-center'>
                    <i className="ri-speed-up-fill text-3xl font-medium"></i>
                    <p className='text-xl font-bold text-center'>{(Captain.captainProgress.distanceTravelled).toFixed(1)} KM</p>
                    <p className='text-gray-600 text-center'>Total Distance</p>
                </div>
                <div className='flex flex-col justify-between items-center'>
                    <i className="ri-booklet-line text-3xl font-medium"></i>
                    <p className='text-xl font-bold text-center'>{Captain.captainProgress.jobsDone}</p>
                    <p className='text-gray-600 text-center'>Total Jobs</p>
                </div>
            </div>
        </div>
        <button className='w-full bg-black text-white px-8 py-4 font-medium rounded-md' onClick={() => {
        setPopupPanel(true);
      }}>See Popups</button>
    </div>
  )
}

export default CaptainProgress