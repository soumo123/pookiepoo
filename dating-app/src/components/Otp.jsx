import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Otp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const navigate = useNavigate()

    const handleChange = (index, value) => {
      if (isNaN(value)) return;
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    };

    const handleBack = ()=>{
        navigate("/dashboard")
    }

  return (
    <div className="otp-container">
      <button className="back-button" onClick={handleBack}>⬅ Back</button>
      <h1 className="otp-title">Enter OTP</h1>
      <p className="otp-subtitle">We have sent a 4-digit code to your phone</p>
      <div className="otp-input-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="otp-input"
          />
        ))}
      </div>
      <button className="otp-button">Verify OTP</button>
    </div>
  )
}

export default Otp