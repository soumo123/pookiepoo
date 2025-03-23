import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleBack = ()=>{
        navigate("/dashboard")
    }



  return (
    <div className="login-page-container">
      <button className="back-btn" onClick={handleBack}>⬅ Back</button>
      <div className="login-box-container">
        <h1 className="login-page-title">Login</h1>
        <p className="login-page-subtitle">Enter your email and password</p>
        <div className="input-fields-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input-field"
          />
          <button className="login-submit-btn">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login