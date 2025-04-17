import React, { useEffect, useState } from 'react'

const VehiclePanel = ({fare, setConfirmRidePanelOpen, setChosenVehicle, setVehicleType}) => {

  return (
        <div className='flex flex-col w-full gap-4 relative pt-4'>
          <p className='text-3xl font-bold'>Choose your vehicle</p>
          <div className='flex w-full justify-between items-center py-4 px-2 border-2 border-gray-100 active:border-black rounded-2xl' onClick={() => {
            setConfirmRidePanelOpen(true)
            setVehicleType('car')
            setChosenVehicle('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png')
          }}>
            <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <p className='text-xl font-bold'>UberGo</p>
                <div><i className="ri-user-fill"></i>4</div>
              </div>
              <p className='font-medium'>{`2 mins away`}</p>
              <p className='text-gray-600'>Affordable compact rides</p>
            </div>
            <div className='text-xl font-bold'><span>&#8377;</span>{fare.car}</div>
          </div>
          <div className='flex w-ful justify-between items-center py-4 px-2 border-2 border-gray-100 active:border-black rounded-2xl' onClick={() => {
            setConfirmRidePanelOpen(true)
            setVehicleType('bike')
            setChosenVehicle('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png')
          }}>
            <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <p className='text-xl font-bold'>Moto</p>
                <div><i className="ri-user-fill"></i>1</div>
              </div>
              <p className='font-medium'>{`2 mins away`}</p>
              <p className='text-gray-600'>Affordable motorcycle rides</p>
            </div>
            <div className='text-xl font-bold'><span>&#8377;</span>{fare.bike}</div>
          </div>
          <div className='flex w-full justify-between items-center py-4 px-2 border-2 border-gray-100 active:border-black rounded-2xl' onClick={() => {
            setConfirmRidePanelOpen(true)
            setVehicleType('auto')
            setChosenVehicle('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png');
          }}>
            <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <p className='text-xl font-bold'>UberAuto</p>
                <div><i className="ri-user-fill"></i>3</div>
              </div>
              <p className='font-medium'>{`3 mins away`}</p>
              <p className='text-gray-600'>Affordable rikshaw rides</p>
            </div>
            <div className='text-xl font-bold'><span>&#8377;</span>{fare.auto}</div>
          </div>
        </div>
  )
}

export default VehiclePanel