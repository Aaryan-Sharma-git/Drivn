import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import done from '../../assets/Animation - 1741254369447.json';


const Done = () => {

    const [play, setPlay] = useState(false);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setPlay(true);
        }, 100)

        return () => clearTimeout(timeOut);
    }, [])
  return (
    <div>
        <div className="w-[300px] h-[300px]">
            {play ? <Lottie animationData={done} loop={false}/> : null}    
        </div>
    </div>
  )
}

export default Done