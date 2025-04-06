import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance';
import { ToastContainer, toast } from 'react-toastify';


const Signup = () => {

    const navigate = useNavigate()
    const [step, setStep] = useState(1);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
        age: '',
        gender: '',
        dob: '',
        // city: '',
        location: {},
        interested_to: '',
        profile_pic: null,
        additionalpictures: [],
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleInputDobChange = (e) => {
        const dob = new Date(e.target.value);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        console.log("DOB:", e.target.value);
        console.log("Age:", age);

        // Optional: Update age in your formData state if needed
        setFormData({ ...formData, dob: e.target.value, age: age })
    };

    const handleFileUpload = (e, isProfile) => {
        if (e.target.files) {
            if (isProfile) {
                setFormData({ ...formData, profile_pic: e.target.files[0] });
            } else {
                // Handle multiple additional pictures
                const newFiles = Array.from(e.target.files);
                setFormData({
                    ...formData,
                    additionalpictures: [...formData.additionalpictures, ...newFiles],
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        formDataToSend.append('firstname', formData.firstName);
        formDataToSend.append('lastname', formData.lastName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('mobile', formData.mobile);
        formDataToSend.append('age', formData.age);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('dob', formData.dob);
        formDataToSend.append('interested_to', formData.interested_to);

        formDataToSend.append('location', JSON.stringify(formData.location));

        if (formData.profile_pic) {
            formDataToSend.append('profile_pic', formData.profile_pic);
        }

        // Append additional pictures
        formData.additionalpictures.forEach((file, index) => {
            formDataToSend.append(`additionalpictures`, file);
        });

        const result = await axiosInstance.post(`/signup`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (result.status === 201) {
            toast.success("Sign up successfully",
                {
                    autoClose: 2000,
                    position: "top-center",
                }
            )
            setTimeout(() => {
                navigate("/login")
            }, 2000);
        } else {
            toast.error("Ooops,Something error",
                {
                    autoClose: 2000,
                    position: "top-center",
                  }
            )
        }
    };
    const isStepValid = () => {
        switch (step) {
            case 1:
                return (
                    formData.firstName &&
                    formData.lastName &&
                    // formData.age &&
                    formData.gender &&
                    formData.mobile &&
                    formData.email && formData.password &&
                    address
                );
            case 2:
                return formData.interested_to;
            case 3:
                return formData.profile_pic;
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
        } else if (step === 4) {
            setStep(3)
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
                            location: {
                                lon: data.lon,
                                lat: data.lat,
                                city: data.address.city,
                                country: data.address.country,
                                country_code: data.address.country_code,
                                state: data.address.state,
                                postcode: data.address.postcode
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
            <ToastContainer />
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
                            style={{ width: `${(step / 4) * 100}%` }}
                            aria-valuenow={(step / 4) * 100}
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
                                            <option value="0">Male</option>
                                            <option value="1">Female</option>
                                            <option value="2">Transgender</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control custom-input1"
                                            name="mobile"
                                            value={formData.mobile}
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
                                    <div className="col-lg-6">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control custom-input1"
                                            name="password"
                                            value={formData.password}
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
                                            name="interested_to"
                                            id="male"
                                            value="0"
                                            checked={formData.interested_to === '0'}
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
                                            name="interested_to"
                                            id="female"
                                            value="1"
                                            checked={formData.interested_to === '1'}
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
                                            name="interested_to"
                                            id="transgender"
                                            value="2"
                                            checked={formData.interested_to === '2'}
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



                        {
                            step === 3 && (
                                <div className="step-3">
                                    <h4>Date of birth</h4>
                                    <div className="d-flex flex-column gap-3">
                                        <div className="form-check">
                                            <input
                                                type="date"
                                                className="form-control custom-input1"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleInputDobChange}
                                                required
                                            />

                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary d-flex align-items-center gap-2 mt-4 ms-auto"
                                        onClick={() => setStep(4)}
                                    // disabled={!isStepValid()}
                                    >
                                        Next <i class="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            )
                        }

                        {step === 4 && (
                            <div className="step-4">
                                <h4>Upload Your Pictures</h4>
                                <div className="text-center">
                                    <label className="profile-picture-upload">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="d-none"
                                            onChange={(e) => handleFileUpload(e, true)}
                                            required
                                            multiple
                                        />
                                        {formData.profile_pic ? (
                                            <img
                                                src={URL.createObjectURL(formData.profile_pic)}
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
                                                    multiple
                                                />
                                                {formData.additionalpictures[index] ? (
                                                    <img
                                                        src={URL.createObjectURL(formData.additionalpictures[index])}
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