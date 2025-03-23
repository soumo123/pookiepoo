import React, { useState } from 'react';

const Signup = () => {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 Data
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        city: '',

        // Step 2 Data
        preferences: [],

        // Step 3 Data
        profilePictures: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePreferencesChange = (gender) => {
        setFormData(prev => ({
            ...prev,
            preferences: prev.preferences.includes(gender)
                ? prev.preferences.filter(g => g !== gender)
                : [...prev.preferences, gender]
        }));
    };

    const handleFileUpload = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const newPictures = [...formData.profilePictures];
            newPictures[index] = reader.result;
            setFormData(prev => ({
                ...prev,
                profilePictures: newPictures
            }));
        };
        reader.readAsDataURL(file);
    };
    const handleSubmit = () => {
        console.log('Form Submitted:', formData);
        // Add your form submission logic here
    };
    return (
        <>
            <div className="signup-container">
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>

                {step === 1 && (
                    <div className="signup-step">
                        <h2>Create Your Profile</h2>
                        <div className="form-grid">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button
                            className="next-btn"
                            onClick={() => setStep(2)}
                            disabled={!formData.firstName || !formData.email}
                        >
                            Next →
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="signup-step">
                        <h2>Who would you like to date?</h2>
                        <div className="preference-grid">
                            {['Male', 'Female', 'Transgender'].map(gender => (
                                <div
                                    key={gender}
                                    className={`preference-card ${formData.preferences.includes(gender) ? 'selected' : ''
                                        }`}
                                    onClick={() => handlePreferencesChange(gender)}
                                >
                                    {gender}
                                </div>
                            ))}
                        </div>
                        <button
                            className="next-btn"
                            onClick={() => setStep(3)}
                            disabled={formData.preferences.length === 0}
                        >
                            Next →
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="signup-step">
                        <h2>Upload Your Photos</h2>
                        <div className="photo-upload">
                            <div className="main-photo">
                                <input
                                    type="file"
                                    id="profilePic"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 0)}
                                />
                                <label htmlFor="profilePic">
                                    {formData.profilePictures[0] ? (
                                        <img
                                            src={formData.profilePictures[0]}
                                            alt="Profile Preview"
                                        />
                                    ) : (
                                        <div className="upload-box">
                                            <span>+</span>
                                            <p>Upload Profile Photo</p>
                                        </div>
                                    )}
                                </label>
                            </div>
                            <div className="additional-photos">
                                {[1, 2, 3].map((index) => (
                                    <div key={index} className="additional-photo">
                                        <input
                                            type="file"
                                            id={`additionalPic${index}`}
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, index)}
                                        />
                                        <label htmlFor={`additionalPic${index}`}>
                                            {formData.profilePictures[index] ? (
                                                <img
                                                    src={formData.profilePictures[index]}
                                                    alt={`Preview ${index}`}
                                                />
                                            ) : (
                                                <div className="upload-box small">
                                                    <span>+</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            className="submit-btn"
                            onClick={handleSubmit}
                            disabled={formData.profilePictures.length < 1}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>


        </>
    )
}

export default Signup