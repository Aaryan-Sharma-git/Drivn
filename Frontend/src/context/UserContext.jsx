import React, { createContext, useMemo, useState } from 'react'

const userContext = createContext();

const UserContext = ({children}) => {

    const [User, setUser] = useState();

    const value = useMemo(() => ({ User, setUser }), [User, setUser]);

  return (
    <div>
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    </div>
  )
}

export default UserContext;
export {userContext};