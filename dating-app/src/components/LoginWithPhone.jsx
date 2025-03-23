import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from 'react-router-dom'


const LoginWithPhone = () => {

    const navigate = useNavigate()
    const [phone, setPhone] = useState("");

    const handleBack = ()=>{
        navigate("/dashboard")
    }
    const handleContinue= ()=>{
        navigate("/otp")
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Pookiepoo</h1>
                <p className="login-subtitle">Enter your phone number to log in</p>
                <div className="input-container">
                    <PhoneInput
                        international
                        defaultCountry="IN"
                        value={phone}
                        onChange={setPhone}
                        className="phone-input"
                    />
                    <button className="back-button" onClick={handleBack}>⬅ Back</button>
                    <button className="login-button" onClick={handleContinue}>Continue</button>
                </div>
                <p className="terms-text">By continuing, you agree to our Terms & Privacy Policy.</p>
            </div>
        </div>
    )
}

export default LoginWithPhone