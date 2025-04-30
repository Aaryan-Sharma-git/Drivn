import React from 'react'

const Popup = ({setPopupPanel, setConfirmPopupPanel, rides, setSelectedRide, setRides}) => {

    const handleAccept = (ride) => {
        setSelectedRide(ride);
        setConfirmPopupPanel(true);
    }

    const handleDecline = (rideId) => {
        const updatedRides = rides.filter(ride => ride._id !== rideId);
        setRides(updatedRides);

        if(updatedRides.length === 0){
            setPopupPanel(false);
        }
    }

  return (
    <div className='w-full pt-4 flex flex-col gap-2 max-h-[100%] overflow-y-auto p-4'>
        
        {rides.length === 0 ? <div className='text-center text-gray-400'>No ride yet.</div> : rides.map((ride, index) => {
            return (<div key={index} className='w-full flex flex-col justify-around gap-4 border-b border-b-gray-200 p-2'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex justify-start items-center gap-4'>
                        <img className='w-[50px] h-[50px] rounded-full object-cover object-centre' src={ride.user.profilePic} alt="" />
                        <p className='text-xl font-bold capitalize'>{ride.user.fullname.firstname + ' ' + ride.user.fullname.lastname}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <p className='text-xl font-bold'><span>&#8377;</span>{ride.fare}</p>
                        <p  className='text-md text-gray-600 font-semibold'>{ride.distance} KM</p>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-4'>
                    <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                        <div className='flex justify-center items-center rounded-full'>
                            <i className="ri-map-pin-range-fill text-xl"></i>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-md text-gray-600 font-semibold'>Destination</p>
                            <p className='text-lg font-medium'>{ride.destination}</p>
                        </div>
                    </div>
                    <div className='flex gap-4 justify-start items-center w-full border-t border-gray-200 py-2'>
                        <div className='flex justify-center items-center rounded-full'>
                            <i className="ri-square-fill text-xl"></i>
                        </div> 
                        <div className='flex flex-col'>
                            <p className='text-md text-gray-600 font-semibold'>Pick up</p>
                            <p className='text-lg font-medium'>{ride.pickup}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-end items-center gap-4'>
                    <button onClick={() => {
                        handleDecline(ride._id)
                    }} className='w-1/3 bg-red-600 text-white px-8 py-4 font-medium rounded-md flex justify-center items-center'>Decline</button>
                    <button className='w-1/3 bg-green-600 text-white px-8 py-4 font-medium rounded-md flex justify-center items-center' onClick={() => {
                        handleAccept(ride);
                    }}>Accept</button>
                </div>  
            </div>)
}) }
    </div>
    
  )
}

export default Popup