import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import {ToastContainer} from "react-toastify";

import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import LandingPage from './pages/LandingPage';
import AuthorizationWrapper from './pages/AuthorizationWrapper';
import UserLogout from './pages/UserLogout';
import CaptainLandingPage from './pages/CaptainLandingPage';
import CaptainAuthorizationWrapper from './pages/CaptainAuthorizationWrapper';
import CaptainLogout from './pages/CaptainLogout';
import Riding from './pages/Riding';
import CaptainPickup from './pages/CaptainPickup';
import CaptainDestination from './pages/CaptainDestination';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },

  {
    path: '/signup',
    element: <UserSignup/>
  },

  {
    path: '/login',
    element: <UserLogin/>
  },

  {
    path: '/captain-signup',
    element: <CaptainSignup/>
  },

  {
    path: '/captain-login',
    element: <CaptainLogin/> 
  },
  {
    path: '/landing-page',
    element: 
    <AuthorizationWrapper>
      <LandingPage/>
    </AuthorizationWrapper>
  },
  {
    path: '/user/logout',
    element: 
      <UserLogout/>
  },
  {
    path: '/captain-landing-page',
    element: 
    <CaptainAuthorizationWrapper>
      <CaptainLandingPage/>
    </CaptainAuthorizationWrapper>
  },
  {
    path: '/captain/logout',
    element:
      <CaptainLogout/>
  },
  {
    path: '/riding',
    element: <Riding/>
  },
  {
    path: '/captain-pickup',
    element: <CaptainPickup/>
  },
  {
    path: '/captain-destination',
    element: <CaptainDestination/>
  }
]);

const App = () => {
  return (
    <div className='topLvl'>
      <div className='app'>
        <RouterProvider router={router}/>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      </div>
    </div>
  )
}

export default App
