import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import Swiper from './components/Swiper'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Loader from './custom/Loader';
import ParallelUpload from './components/ParallelUpload.jsx';
import { userLoginSuccess, userLoginFail } from './redux/actions/userAction.js';
import axiosInstance, { loadTokens } from './axiosInstance.js';
import { useSelector, useDispatch } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute.jsx'; // ✅ Add this
import PublicRoute from './components/PublicRoute.jsx';


function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const Lazyswiper = lazy(() => import("./components/Swiper.jsx"))
  const LazySignup = lazy(() => import("./components/Signup.jsx"))
  const LazyDashboard = lazy(() => import("./components/Dashboard.jsx"))
  const LazyLoginWithPhone = lazy(() => import("./components/LoginWithPhone.jsx"))
  const LazyOtp = lazy(() => import("./components/Otp.jsx"))
  const LazyLogin = lazy(() => import("./components/Login.jsx"))
  const LazyViewProfile = lazy(() => import("./components/Viewcard.jsx"))
  const LazyMessage = lazy(() => import("./components/Message.jsx"))
  const LazyBottom = lazy(() => import("./custom/BottomNavigation.jsx"))
  const LazyProfile = lazy(()=>import("./components/Profile.jsx"))
  const LazyLikes = lazy(()=>import("./components/Likes.jsx"))

  const user_id = localStorage.getItem("user_id")

  const getUserData = async () => {

    try {
      const res = await axiosInstance.get(`/get_profile?user_id=${user_id}`);
      if (res.data) {

        dispatch(userLoginSuccess(res.data.data,res.data.data1))
      }
    } catch (error) {
      dispatch(userLoginFail(error.config.data))
    }

  }

  useEffect(() => {
    if (user_id !== null) {
      getUserData()
    }
  }, [])



  return (
    <>
      <Suspense fallback={<Loader minDelay={30000} />}>
        <Routes>
          {/* ✅ Protected Routes */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute user_id={user_id}>
                <Lazyswiper />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/messages"
            element={
              <ProtectedRoute user_id={user_id}>
                <LazyMessage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute user_id={user_id}>
                <LazyViewProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/view"
            element={
              <ProtectedRoute user_id={user_id}>
                <LazyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/likes"
            element={
              <ProtectedRoute user_id={user_id}>
                <LazyLikes />
              </ProtectedRoute>
            }
          />

          {/* ✅ Public Routes */}
          <Route
            exact
            path="/signup"
            element={
              <PublicRoute user_id={user_id}>
                <LazySignup />
              </PublicRoute>
            }
          />
          <Route exact path="/dashboard" element={
            <PublicRoute user_id={user_id}>
                <LazyDashboard />
              </PublicRoute>

          } />
          <Route
            exact
            path="/loginwithphone"
            element={
              <PublicRoute user_id={user_id}>
                <LazyLoginWithPhone />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/otp"
            element={
              <PublicRoute user_id={user_id}>
                <LazyOtp />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute user_id={user_id}>
                <LazyLogin />
              </PublicRoute>
            }
          />
          <Route exact path="/upload" element={<ParallelUpload />} />
        </Routes>
            {
              user_id && (
                <LazyBottom />
              )
            }
      </Suspense>

    </>
  )
}

export default App
