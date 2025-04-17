import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingAnimation from './animations/LoadingAnimation';

const CaptainLogout = () => {

    const navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    withCredentials: true
                })
    
                if(response.status === 200){
                    localStorage.removeItem("token");
                    setIsLoading(false);
                    navigate('/captain-login');
                }
            } catch (error) {
                console.log(`Logout failed: ${error}`);
            }
            
        }

        logout();
    }, [navigate]);

    if(IsLoading){
        return(
            <div className="flex justify-center items-center h-screen">
                <LoadingAnimation/>
            </div>
        )
    }

  return (
    <>
    </>
  )
}

export default CaptainLogout