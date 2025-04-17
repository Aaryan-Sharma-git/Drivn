import React from 'react';
import Lottie from 'lottie-react';
import loadingData from '../../assets/Animation - 1740230401419.json';

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[100px] h-[100px]">
        <Lottie animationData={loadingData} loop={true} autoPlay={true} />
      </div>
    </div>
  );
}

export default LoadingAnimation;
