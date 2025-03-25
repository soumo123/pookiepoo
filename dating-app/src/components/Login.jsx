import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    navigate("/dashboard")
  }



  return (
    <>
      <div class="container d-flex justify-content-center align-items-center min-vh-100 body-login">
      {/* <a href="#" class="back-button">
      <i class="bi bi-arrow-left icon fs-4"></i>
        </a> */}
        <span className="back-button"  onClick={() => handleBack()}>
        <i class="bi bi-arrow-left icon fs-4"></i>
      </span>
        <div class="login-card p-4 position-relative">
     
          <div class="text-center mb-4">
            <h2 class="fw-bold mb-2 logo">Pookiepoo</h2>
            {/* <p class="text-muted">Please login to continue</p> */}
          </div>

          <form>
            <div class="mb-3 position-relative">
              <i class="bi bi-envelope input-icon"></i>
              <input type="email" class="form-control custom-input" placeholder="Email" />
            </div>

            <div class="mb-4 position-relative">
              <i class="bi bi-lock input-icon"></i>
              <input type="password" class="form-control custom-input" placeholder="Password" />
            </div>

            <button type="submit" class="btn w-100 login-btn mb-3">Continue</button>

            <div class="text-center mb-4">
              <a href="#" class="text-decoration-none text-secondary">Forgot Password?</a>
            </div>

            <div class="d-flex align-items-center mb-4">
              <div class="divider"></div>
              <span class="px-3 text-muted small">OR</span>
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