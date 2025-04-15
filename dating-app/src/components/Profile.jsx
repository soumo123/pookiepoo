import React, { useState,useEffect } from 'react'
import { FiChevronLeft, FiEdit, FiMapPin, FiBriefcase, FiHeart, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {

    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('edit');
    const [profile, setProfile] = useState({
       
        complete: 100,
        superLikes: 5,
        goldMember: true,
        location: 'Kolkata, West Bengal',
        pronouns: '',
        height: '5ft 9in',
        relationshipGoal: 'Long-term partner',
        relationshipType: 'Open to exploring',
        languages: ['Bengali', 'English', 'Hindi'],
        interests: ['Bollywood', 'Stand up Comedy', 'Poetry', 'Coffee', 'Dogs'],
        zodiac: 'Sagittarius',
        education: 'Bachelors',
        familyPlans: 'I want children',
        vaccinated: 'Vaccinated',
        personalityType: '',
        communicationStyle: 'Phone caller',
        loveStyle: 'Time together',
        pets: 'Dog',
        drinking: 'On special occasions',
        smoking: 'Non-smoker',
        workout: 'Everyday',
        anthem: 'Meri Tum Ho (Unplugged)',
        artist: 'Pritam',
        gender: 'Man',
        orientation: 'Straight',
        hideAge: false,
        hideDistance: false
    });
    const userData = useSelector((state)=>state.userDettails)
    const toggleEdit = () => setEditMode(!editMode);
    const handleBack = () => editMode ? setEditMode(false) : navigate(-1);

    const handleLogout = () => {
        localStorage.removeItem("user_id")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/dashboard")
        window.location.reload();
    }

    useEffect(() => {
        if(userData.user){
            setProfile({
                ...profile,
                name:userData?.user?.firstname+" "+userData?.user?.lastname,
                age:userData?.user?.age,
                profile:userData?.user?.profile_pic?.url

            })
        }
    }, [userData.user])
    
console.log("profile",profile)
    return (
        <>


            <div className="profile-container">
                {/* Header */}
                <div className="profile-header1">
                    <button className="icon-button" onClick={handleBack}>
                        <FiChevronLeft size={24} />
                    </button>
                    {editMode ? (
                        <div className="edit-tabs">
                            <button
                                className={activeTab === 'edit' ? 'active' : ''}
                                onClick={() => setActiveTab('edit')}
                            >
                                Edit
                            </button>
                            <button
                                className={activeTab === 'preview' ? 'active' : ''}
                                onClick={() => setActiveTab('preview')}
                            >
                                Preview
                            </button>
                        </div>
                    ) : (
                        <>
                        <button className="edit-button" onClick={toggleEdit}>
                            <FiEdit size={18} />
                            Edit Profile
                        </button>
                         <button className="edit-button" onClick={handleLogout}>
                         <i class="bi bi-box-arrow-right"></i>
                        Logout
                     </button>
                     </>
                    )}
                </div>

                {/* Profile Content */}
                {!editMode ? (
                    <div className="profile-view">
                        {/* Profile Completion */}
                        <div className="completion-bar">
                            <div className="completion-text">
                                <span>{profile.complete}% COMPLETE</span>
                                <div className="progress-bar1">
                                    <div style={{ width: `${profile.complete}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="profile-info">
                            <div className="profile-image">
                                
                                <img src={profile.profile} alt={profile.name} />
                            </div>
                            <h1>{profile.name}, {profile.age}</h1>

                            {/* Premium Features */}
                            <div className="premium-features">
                                <div className="feature-item">
                                <i class="bi bi-star fs-2"></i>
                                    {/* <span>{profile.superLikes}</span> */}
                                    <p>{profile.superLikes} Super Likes</p>
                                </div>
                                {/* <div className="feature-item">
                                    <span>My Boosts</span>
                                </div> */}
                                <div className="feature-item">
                                <i class="bi bi-fire  fs-2"></i>
                                    <span>Subscriptions</span>
                                </div>
                            </div>

                            {/* Gold Membership */}
                            {profile.goldMember && (
                                <div className="gold-membership">
                                    <div className="gold-header">
                                        <span>tinder [GOLD]</span>
                                        <button className="upgrade-btn">Upgrade</button>
                                    </div>
                                    <div className="comparison-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>What's Included</th>
                                                    <th>Free</th>
                                                    <th>Gold</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>See Who Likes You</td>
                                                    <td>—</td>
                                                    <td>✓</td>
                                                </tr>
                                                <tr>
                                                    <td>Top Picks</td>
                                                    <td>—</td>
                                                    <td>✓</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="see-all-btn">See All Features</button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="edit-profile-view">
                        {/* Edit Profile Sections */}
                        <div className="edit-section">
                            <h3>Media</h3>
                            <p>Add up to 9 photos.</p>
                            <div className="photo-grid">
                                {/* {profile.photos.map((photo, index) => (
                                    <div key={index} className="photo-item">
                                        <img src={photo} alt={`Profile ${index + 1}`} />
                                    </div>
                                ))} */}
                                <div className="add-photo">
                                    <FiPlus size={24} />
                                </div>
                            </div>
                            <div className="photo-options">
                                <h4>Photo Options</h4>
                                <div className="option-item">
                                    <span>Smart Photos</span>
                                </div>
                            </div>
                        </div>

                        <div className="edit-section">
                            <h3>Interests</h3>
                            <div className="interests-list">
                                {profile.interests.join(', ')}...
                            </div>
                        </div>

                        <div className="edit-section">
                            <h3>Relationship Goals</h3>
                            <div className="info-item">
                                <span>📌 Looking for</span>
                                <span>{profile.relationshipGoal}</span>
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
                                <span>🎧 {profile.height}</span>
                            </div>
                        </div>

                        <div className="edit-section">
                            <h3>Relationship Type</h3>
                            <div className="info-item">
                                <span>📒 {profile.relationshipType}</span>
                            </div>
                        </div>

                        <div className="edit-section">
                            <h3>Languages | Know</h3>
                            <div className="info-item">
                                <span>🔄 {profile.languages.join(', ')}</span>
                            </div>
                        </div>

                        <div className="edit-section">
                            <h3>Basics</h3>
                            <div className="info-grid">
                                <div className="info-row">
                                    <span>📌 Zodiac</span>
                                    <span>{profile.zodiac}</span>
                                </div>
                                {/* Add other basics similarly */}
                            </div>
                        </div>

                        <div className="edit-section">
                            <h3>Basics</h3>
                            <div className="info-grid">
                                <div className="info-row">
                                    <span>📌 Zodiac</span>
                                    <span>{profile.zodiac}</span>
                                </div>
                                {/* Add other basics similarly */}
                            </div>
                        </div>

                        <div className="edit-section">
                            <h3>Basics</h3>
                            <div className="info-grid">
                                <div className="info-row">
                                    <span>📌 Zodiac</span>
                                    <span>{profile.zodiac}</span>
                                </div>
                                {/* Add other basics similarly */}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Profile