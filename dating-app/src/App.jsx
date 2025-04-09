import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import Swiper from './components/Swiper'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Loader from './custom/Loader';
import ParallelUpload from './components/ParallelUpload.jsx';
import { userLoginSuccess,userLoginFail } from './redux/actions/userAction.js';
import axiosInstance from './axiosInstance.js';
import {useDispatch} from 'react-redux'


function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const Lazyswiper = lazy(() => import("./components/Swiper.jsx"))
  const LazySignup = lazy(() => import("./components/Signup.jsx"))
  const LazyDashboard = lazy(() => import("./components/Dashboard.jsx"))
  const LazyLoginWithPhone = lazy(() => import("./components/LoginWithPhone.jsx"))
  const LazyOtp = lazy(() => import("./components/Otp.jsx"))
  const LazyLogin = lazy(() => import("./components/Login.jsx"))
  const LazyViewProdile = lazy(() => import("./components/Viewcard.jsx"))

  const user_id = localStorage.getItem("user_id")


  const getUserData = async()=>{

    try {
      const res = await axiosInstance.get(`/get_profile?user_id=${user_id}`);
      if(res.data.data){
        dispatch(userLoginSuccess(res.data.data))
      }
    } catch (error) {
       console.error(error);
        dispatch(userLoginFail(error))
    }

  }

  useEffect(() => {
    getUserData()
  }, [])
  


  return (
    <>

      <Suspense fallback={<Loader minDelay={30000} />}>

        <BrowserRouter>

          <Routes>

            <Route exact={true} path="/" element={<Lazyswiper />} />
            <Route exact={true} path="/signup" element={<LazySignup />} />
            <Route exact={true} path={"/dashboard"} element={<LazyDashboard />} />
            <Route exact={true} path={"/loginwithphone"} element={<LazyLoginWithPhone />} />
            <Route exact={true} path={"/otp"} element={<LazyOtp />} />
            <Route exact={true} path={"/login"} element={<LazyLogin />} />
            <Route exact={true} path={"/profile"} element={<LazyViewProdile />} />
            <Route exact={true} path={"/upload"} element={<ParallelUpload />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
