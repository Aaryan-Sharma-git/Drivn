import React from 'react';
import Lottie from 'lottie-react';
import loadingData from '../../assets/Animation - 1740230401419.json';

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[80px] h-[80px]">
        <Lottie animationData={loadingData} loop={true} autoPlay={true} />
      </div>
    </div>
  );
}

export default LoadingAnimation;
