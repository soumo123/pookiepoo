import React, { useState, useEffect } from 'react'
import { FiChevronLeft, FiEdit, FiMapPin, FiBriefcase, FiHeart, FiPlus } from 'react-icons/fi';
import Interest from '../custom/options/Interest';
import { useSelector } from 'react-redux';



const EditProfile = ({ profileData }) => {

    const [profile, setProfile] = useState([])
    const userdetails = useSelector((state)=>state.userDettails.userinfo)
    console.log("userdetailsuserdetails",userdetails)
    useEffect(() => {
        setProfile(profileData)
    }, [profileData])


    console.log("profileprofile", profile)


    return (
        <div className="edit-profile-view">
            {/* Edit Profile Sections */}
            <div className="edit-section">
                <h3>Your Photos</h3>
                <div className="photo-grid">
                    {profile?.additionalpictures?.map((photo, index) => (
                        <div key={index} className="photo-item">
                            <img src={photo.url} alt={`Profile ${index + 1}`} />
                        </div>
                    ))}
                    <div className="add-photo">
                        <FiPlus size={24} />
                    </div>
                </div>
                {/* <div className="photo-options">
                                    <h4>Photo Options</h4>
                                    <div className="option-item">
                                        <span>Smart Photos</span>
                                    </div>
                                </div> */}
            </div>

            <div className="edit-section">
                <h3>Interests</h3>
                    {/* {profile.interests.join(', ')}... */}
                    {/* Badminton , Crickt , Driving */}
                    <Interest interests={userdetails?.interests}/>
               
            </div>

            <div className="edit-section">
                <h3>Relationship Goals</h3>
                <div className="info-item">
                    <span>📌 Looking for</span>
                    {/* <span>{profile.relationshipGoal}</span> */}
                </div>
            </div>

            <div className="edit-section">
                <h3>Pronouns</h3>
                <div className="info-item">
                    <span>📍 Add pronouns</span>
                </div>
            </div>

            <div className="edit-section">
                <h3>Height</h3>
                <div className="info-item">
                    {/* <span>🎧 {profile.height}</span> */}
                </div>
            </div>

            <div className="edit-section">
                <h3>Relationship Type</h3>
                <div className="info-item">
                    {/* <span>📒 {profile.relationshipType}</span> */}
                </div>
            </div>

            <div className="edit-section">
                <h3>Languages | Know</h3>
                <div className="info-item">
                    {/* <span>🔄 {profile.languages.join(', ')}</span> */}
                </div>
            </div>

            <div className="edit-section">
                <h3>Basics</h3>
                <div className="info-grid">
                    <div className="info-row">
                        <span>📌 Zodiac</span>
                        {/* <span>{profile.zodiac}</span> */}
                    </div>
                    {/* Add other basics similarly */}
                </div>
            </div>

            <div className="edit-section">
                <h3>Basics</h3>
                <div className="info-grid">
                    <div className="info-row">
                        <span>📌 Zodiac</span>
                        {/* <span>{profile.zodiac}</span> */}
                    </div>
                    {/* Add other basics similarly */}
                </div>
            </div>

            <div className="edit-section">
                <h3>Basics</h3>
                <div className="info-grid">
                    <div className="info-row">
                        <span>📌 Zodiac</span>
                        {/* <span>{profile.zodiac}</span> */}
                    </div>
                    {/* Add other basics similarly */}
                </div>
            </div>
        </div>
    )
}

export default EditProfile
