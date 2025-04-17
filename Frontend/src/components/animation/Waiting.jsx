import React from 'react'
import Lottie from 'lottie-react'
import WaitingAnimation from '../../assets/Animation - 1740566893797.json'

const Waiting = () => {
  return (
    <div>
        <div className="w-[50px] h-[50px]">
            <Lottie animationData={WaitingAnimation} loop={true} autoPlay={true}/>
        </div>
    </div>
  )
}

export default Waiting