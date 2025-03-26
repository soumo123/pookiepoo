import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()

    const handleCreateAccount = ()=>{
        navigate("/signup")
    }

    const handleLoginWithPhone = ()=>{
        navigate("/loginwithphone")
    }

    const handleLogin = ()=>{
        navigate("/login")
    }

    return (
        <>
          <div className="home-container">
      {/* Navigation Bar */}
      <nav className="home-nav">
        <div className="logo">🔥 Pookiepoo</div>
        <div className="nav-links">
          <button className="nav-btn" onClick={handleLogin}>Log In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Swipe with Intent, Love with Confidence</h1>
          <p className="hero-subtitle">✨ Your next great love story starts here.</p>
          
          <div className="auth-buttons">
            <button 
              className="signup-btn"
              onClick={handleCreateAccount}
            >
              Create Account 
            </button>
            <button 
              className="login-btn-login"
              style={{width:"60%"}}
              onClick={handleLoginWithPhone}
            >
              Signin With Phone
            </button>
          </div>
        </div>

        {/* Floating Cards Background */}
        <div className="floating-cards">
          <div className="cardd card1">
            <img src="https://source.unsplash.com/random/300x400?person1" alt="Profile" />
          </div>
          <div className="cardd card2">
            <img src="https://source.unsplash.com/random/300x400?person2" alt="Profile" />
          </div>
          <div className="card card3">
            <img src="https://source.unsplash.com/random/300x400?person3" alt="Profile" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2024 MatchMaker. All rights reserved</p>
      </footer>
    </div>

        </>
    )
}

export default Dashboard