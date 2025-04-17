import React from 'react'

const LocationPanel = ({value}) => {

  return (
    <div className='w-full'>
      <div className=' w-full flex flex-col gap-3'>
        {Array.isArray(value.suggestionArray) && value.suggestionArray.map((element, index) => {
          return (
            <div key={index} className='flex justify-start gap-4 items-center border-2 border-gray-100 active:border-black py-4 px-2 rounded-2xl' onClick={() => {
              if(value.activeField === value.pickupInput.current){
                value.setPickup(element.name+', '+element.address)
              }
              else{
                value.setDestination(element.name+', '+element.address);
              }

              value.setSuggestionArray([]);
              value.setActiveField(null);
            }}>
              <div className='w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full'>
                <i className="ri-map-pin-fill text-lg"></i>
              </div>
              <div className='flex flex-col items-start'>
                <p className='font-medium'>{element.name.length <= 30 ? element.name : `${element.name.substring(0, 30)}...`}</p>
                <p className='text-sm text-gray-600 font-semibold'>{element.address.length <= 40 ? element.address : `${element.address.substring(0, 40)}...`}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LocationPanel