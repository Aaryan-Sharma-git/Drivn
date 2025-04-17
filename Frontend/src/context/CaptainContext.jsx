import React, { createContext, useMemo, useState } from 'react'

const captainContext = createContext();

const CaptainContext = ({children}) => {

    const [Captain, setCaptain] = useState('');

    const value = useMemo(() => ({ Captain, setCaptain }), [Captain, setCaptain]);

  return (
    <div>
        <captainContext.Provider value = {value}>
            {children}
        </captainContext.Provider>
    </div>
  )
}

export default CaptainContext
export {captainContext}