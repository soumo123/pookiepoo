import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance ,{ setTokens }from '../axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { userLoginFail, userLoginSuccess } from '../redux/actions/userAction';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    navigate("/dashboard")
  }

  const handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(`/login`, {
        email,
        password,
      });
      
      const { accessToken, refreshToken, user } = res.data.data;
      setTokens(accessToken, refreshToken,user.user_id);
      dispatch(userLoginSuccess(user))
      // alert(`Welcome ${user.firstname}`);
    } catch (err) {
      console.error(err);
      dispatch(userLoginFail(err))
      
    }
  };

  return (
    <>
      <div class="container d-flex justify-content-center align-items-center min-vh-100 body-login">
      {/* <a href="#" class="back-button">
      <i class="bi bi-arrow-left icon fs-4"></i>
        </a> */}
        <span className="back-button" onClick={() => handleBack()}>
        <i class="bi bi-arrow-left icon fs-4"></i>
      </span>
        <div class="login-card p-4 position-relative">
     
          <div class="text-center mb-4">
            <h2 class="fw-bold mb-2 logo text-white">Pookiepoo</h2>
            {/* <p class="text-muted">Please login to continue</p> */}
          </div>

          <form>
            <div class="mb-3 position-relative">
              <i class="bi bi-envelope input-icon"></i>
              <input type="email" class="form-control custom-input" placeholder="Email" value={email} onChange={handleEmailChange}/>
            </div>

            <div class="mb-4 position-relative">
              <i class="bi bi-lock input-icon"></i>
              <input type="password" class="form-control custom-input" placeholder="Password" value={password} onChange={handlePasswordChange}/>
            </div>

            <button type="submit" class="w-100 login-btn-login mb-3" onClick={handleLogin}>Continue</button>

            <div class="text-center mb-4">
              <a href="#" class="text-decoration-none text-white" style={{fontWeight:"700"}}>Forgot Password?</a>
            </div>

            <div class="d-flex align-items-center mb-4">
              <div class="divider"></div>
              <span class="px-3 text-white" style={{fontWeight:"700"}}>OR</span>
              <div class="divider"></div>
            </div>

            <div class="d-grid gap-3">
              <button type="button" class="btn social-btn d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-facebook text-primary"></i>
                <span>Continue with Facebook</span>
              </button>

              <button type="button" class="btn social-btn d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-google text-danger"></i>
                <span>Continue with Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>


    </>
  )
}

export default Login