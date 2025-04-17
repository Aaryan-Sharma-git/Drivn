import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { captainContext } from '../context/CaptainContext'
import LoadingAnimation from './animations/LoadingAnimation';


const CaptainAuthorizationWrapper = ({ children }) => {

    const navigate = useNavigate();
    const { Captain, setCaptain } = useContext(captainContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        const wrapper = async () => {
            const token = localStorage.getItem("token");

            try {
                if (!token) {
                    navigate('/captain-login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                    setCaptain(response.data.captain);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                localStorage.removeItem("token");
                navigate('/captain-login');
            }
        }

        wrapper();

    }, [navigate, setCaptain]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
              <LoadingAnimation/>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainAuthorizationWrapper;