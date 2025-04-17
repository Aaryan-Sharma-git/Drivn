import React, { useEffect, useRef, useState } from 'react'

const OtpTextarea = ({length, handleOtpSubmit}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        };
    }, [])

    const handleChange = (index, e) => {
        const value = e.target.value;

        if(isNaN(value.substring(value.length-1))){
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length-1);
        setOtp(newOtp);
        
        if(value && index < length-1 && inputRefs.current[index+1]){
            inputRefs.current[index+1].focus();
        }

        const combinedOtp = newOtp.join("");
        if(combinedOtp.length === length){
            handleOtpSubmit(combinedOtp);
        }
    }

    const handleClick = (index, e) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        if(index > 0 && inputRefs.current[otp.indexOf("")]){
            inputRefs.current[otp.indexOf("")].focus();
        }

    }

    const handleKeyDown = (index, e) => {
        if(e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index-1] ){
            inputRefs.current[index-1].focus();
        }
    }

  return (
    <div className='flex justify-center gap-4 items-center my-5'>
        {
            otp.map((element, index) => {
                return(
                    <input ref={(input) => {inputRefs.current[index] = input}} key={index} className='w-[70px] h-[70px] border-0 bg-gray-200 rounded-xl text-2xl text-center' type="text" value={otp[index]} onChange={(e) => handleChange(index, e)} onClick={(e) => {handleClick(index, e)}} onKeyDown={(e) => {handleKeyDown(index, e)}}/>
                )
            })
        }
    </div>
  )
}

export default OtpTextarea