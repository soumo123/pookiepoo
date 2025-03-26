/* eslint-disable no-unused-vars */
import { useState } from "react";
import "react-phone-number-input/style.css";
import { useNavigate } from 'react-router-dom'


const LoginWithPhone = () => {

    const navigate = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOTP] = useState(['', '', '', '']);

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phoneNumber.length === 10) {
          setShowOTP(true);
        }
      };
    
      const handleOTPChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
          const newOTP = [...otp];
          newOTP[index] = value;
          setOTP(newOTP);
          
          if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
          }
        }
      };
    
      const handleOTPKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
          const prevInput = document.getElementById(`otp-${index - 1}`);
          prevInput?.focus();
        }
      };
    
      const handleBack = () => {
        if(showOTP){
            setShowOTP(false);
            setOTP(['', '', '', '']);
            setPhoneNumber('')
        }else{
            navigate("/dashboard")
        }
      };


    return (
        <div className="auth-container d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
           
                  <span 
                    onClick={handleBack}
                    className="back-button"
                  >
                    {/* <ArrowLeft size={24} /> */}
                    <i class="bi bi-arrow-left fs-2"></i>
                  </span>
            
              <div className="auth-content text-center position-relative">
        
                <div className="mb-4">
                  {/* <Heart className="heart-icon" size={56} fill="white" stroke="white" /> */}
                </div>
                <h1 className="fw-bold mb-2">Pookiepoo</h1>
                <p className="mb-5 opacity-75">Sign in</p>
  
                {!showOTP ? (
                  <form onSubmit={handlePhoneSubmit}>
                    <div className="position-relative mb-4">
                      <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
                        {/* <Phone className="text-white opacity-75" size={20} /> */}
                        <i class="bi bi-telephone text-white opacity-75"></i>
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Enter your phone number"
                        className="form-control form-control-lg ps-5 auth-input"
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                    <button type="submit" className="btn btn-lg w-100 mb-3 auth-button py-3">
                      <span className="me-2">Continue</span>
                      {/* <ArrowRight size={20} /> */}
                      <i class="bi bi-arrow-right"></i>
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
                      {/* <KeyRound className="text-white opacity-75" size={20} /> */}
                      <i class="bi bi-key text-white opacity-75"></i>
                      <span className="opacity-75">Enter verification code</span>
                    </div>
                    <div className="d-flex justify-content-between gap-2 mb-4">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          onKeyDown={(e) => handleOTPKeyDown(index, e)}
                          className="form-control form-control-lg text-center fw-bold otp-input"
                          style={{ width: '65px', height: '65px' }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => console.log('Verify OTP:', otp.join(''))}
                      className="btn btn-lg w-100 mb-4 auth-button py-3"
                    >
                      <span className="me-2">Verify</span>
                      {/* <ArrowRight size={20} /> */}
                      <i class="bi bi-arrow-right"></i>
                    </button>
                    <p className="opacity-75">
                      Didn't receive code? {' '}
                      <button className="btn btn-link btn-sm p-0 resend-button fw-semibold">
                        Resend
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginWithPhone