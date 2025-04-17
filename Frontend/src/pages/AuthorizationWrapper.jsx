import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../context/UserContext'
import LoadingAnimation from './animations/LoadingAnimation';


const AuthorizationWrapper = ({ children }) => {

    const navigate = useNavigate();
    const { User, setUser } = useContext(userContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        const wrapper = async () => {
            const token = localStorage.getItem("token");

            try {
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                    setUser(response.data.user);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                localStorage.removeItem("token");
                navigate('/login');
            }
        }

        wrapper();

    }, [navigate, setUser]);

    if (isLoading) {
      return (
          <div className="flex justify-center items-center h-screen">
              <LoadingAnimation />
          </div>
      );
    }
  
    return (
        <>
          {children}
        </>
    )
}

export default AuthorizationWrapper;
