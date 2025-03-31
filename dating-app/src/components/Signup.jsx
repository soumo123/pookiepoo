import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
 

const Signup = () => {

    const navigate = useNavigate()
    const [step, setStep] = useState(1);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        // city: '',
        location:{},
        interestedIn: '',
        profilePicture: null,
        additionalPictures: [],
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e, isProfile) => {
        if (e.target.files) {
            if (isProfile) {
                setFormData({ ...formData, profilePicture: e.target.files[0] });
            } else {
                setFormData({
                    ...formData,
                    additionalPictures: [...formData.additionalPictures, e.target.files[0]],
                });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return (
                    formData.firstName &&
                    formData.lastName &&
                    // formData.age &&
                    formData.gender &&
                    formData.phone &&
                    formData.email &&
                    address
                );
            case 2:
                return formData.interestedIn;
            case 3:
                return formData.profilePicture;
            default:
                return false;
        }
    };

    const handleBack = () => {
        if (step === 1) {
            navigate("/dashboard")
        } else if (step === 2) {
            setStep(1)
        } else if (step === 3) {
            setStep(2)
        } else {
            navigate("/dashboard")
        }
    }

    useEffect(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
    
              // Fetch human-readable address
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                );
                const data = await response.json();
                console.log(data); // helpful for debugging
                const city = data.address.city || data.address.town || data.address.village;
                const state = data.address.state;
                setAddress(`${city}, ${state}`);
                setFormData({
                    ...formData,
                    location:{
                        lon:data.lon,
                        lat:data.lat,
                        city:data.address.city,
                        country:data.address.country,
                        country_code:data.address.country_code,
                        state:data.address.state,
                        postcode:data.address.postcode
                    }
                })
              } catch (err) {
                setError('Failed to fetch address');
              }
            },
            (err) => {
              setError(err.message);
            }
          );
        } else {
          setError('Geolocation not supported');
        }
      }, []);


    return (
        <>
            <div className="container">
                <span className="back-button" onClick={() => handleBack()}>
                    <i class="bi bi-arrow-left icon fs-4"></i>
                </span>
                <div className="signup-container">
                    <div className="header-section">
                        {/* <Heart size={48} color="#fff" fill="#fff" /> */}
                        <i class="bi bi-heart-fill fs-1"></i>
                        <h2>Find Your Perfect Match</h2>
                        <p>Join thousands of people looking for meaningful connections</p>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${(step / 3) * 100}%` }}
                            aria-valuenow={(step / 3) * 100}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="step-1">
                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control custom-input1"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required

                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control custom-input1"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required

                                        />
                                    </div>
                                    {/* <div className="col-md-6">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control custom-input1"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="18"
                    placeholder="Must be 18 or older"
                  />
                </div> */}
                                    <div className="col-6">
                                        <label className="form-label">Gender</label>
                                        <select
                                            className="form-select custom-input1"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="transgender">Transgender</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control custom-input1"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required

                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control custom-input1"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required

                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Location</label>
                                        <input
                                            type="text"
                                            className="form-control custom-input1"
                                            name="city"
                                            // value={formData.city}
                                            value={address}
                                            onChange={handleInputChange}
                                            required
                                            disabled

                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary d-flex align-items-center gap-2 mt-4 ms-auto"
                                    onClick={() => setStep(2)}
                                // disabled={!isStepValid()}
                                >
                                    Next  <i class="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="step-2">
                                <h4>I'm Interested In</h4>
                                <div className="d-flex flex-column gap-3">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="interestedIn"
                                            id="male"
                                            value="male"
                                            checked={formData.interestedIn === 'male'}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="male">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="interestedIn"
                                            id="female"
                                            value="female"
                                            checked={formData.interestedIn === 'female'}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="female">
                                            Female
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="interestedIn"
                                            id="transgender"
                                            value="transgender"
                                            checked={formData.interestedIn === 'transgender'}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="transgender">
                                            Transgender
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary d-flex align-items-center gap-2 mt-4 ms-auto"
                                    onClick={() => setStep(3)}
                                // disabled={!isStepValid()}
                                >
                                    Next <i class="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="step-3">
                                <h4>Upload Your Pictures</h4>
                                <div className="text-center">
                                    <label className="profile-picture-upload">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="d-none"
                                            onChange={(e) => handleFileUpload(e, true)}
                                            required
                                        />
                                        {formData.profilePicture ? (
                                            <img
                                                src={URL.createObjectURL(formData.profilePicture)}
                                                alt="Profile"
                                                className="img-fluid rounded-circle"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            ""
                                            // <Upload size={40} color="#fff" /> 
                                        )}
                                    </label>
                                    <p className="text-muted">Upload your best photo as profile picture</p>
                                </div>

                                <div className="additional-pictures">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="picture-upload-box">
                                            <label className="w-100 h-100 d-flex align-items-center justify-content-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="d-none"
                                                    onChange={(e) => handleFileUpload(e, false)}
                                                />
                                                {formData.additionalPictures[index] ? (
                                                    <img
                                                        src={URL.createObjectURL(formData.additionalPictures[index])}
                                                        alt={`Additional ${index + 1}`}
                                                        className="img-fluid"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                                                    />
                                                ) : (
                                                    ""
                                                    // <Upload size={30} color="#fff" />
                                                )}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary d-block w-100 mt-4"
                                // disabled={!isStepValid()}
                                >
                                    <i class="bi bi-upload"></i> Complete Sign Up
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>


        </>
       
    )
}

export default Signup