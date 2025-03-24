import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiArrowLeft, 
    FiHeart, 
    FiX, 
    FiStar, 
    FiInfo,
    FiMapPin,
    FiCamera,
    FiUser 
  } from 'react-icons/fi';
  import { FaHeart, FaStar } from 'react-icons/fa';

const ViewCard = ({ profile }) => {
    const navigate = useNavigate();
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isSuperLiked, setIsSuperLiked] = useState(false);
  
    const dummyImages = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ];
  
    const user = profile || {
      id: 1,
      name: 'Sophia',
      age: 27,
      images: dummyImages,
      bio: 'Adventure seeker and professional photographer. Love hiking, trying new restaurants, and weekend getaways. Looking for someone spontaneous and passionate about life!',
      interests: ['Hiking', 'Photography', 'Travel', 'Yoga', 'Coffee'],
      city: 'San Francisco',
      distance: '5 miles away',
      profession: 'Photographer'
    };

    const hanldeBack = ()=>{
        navigate("/")

    }

  return (
    <div className="profile-view-container">
    {/* Header */}
    <header className="profile-header">
      <button className="back-button" onClick={() => hanldeBack()}>
        <FiArrowLeft className="icon" />
      </button>
      <div className="header-logo" onClick={hanldeBack}></div>
      <button className="info-button">
        <FiInfo className="icon" />
      </button>
    </header>

    {/* Main Content */}
    <main className="profile-content">
      {/* Photo Gallery */}
      <div className="photo-gallery">
        <img 
          src={user.images[currentPhotoIndex]} 
          alt={user.name} 
          className="main-photo"
        />
        <div className="photo-overlay" />
        
        <div className="photo-indicators">
          {user.images.map((_, index) => (
            <div 
              key={index}
              className={`indicator ${index === currentPhotoIndex ? 'active' : ''}`}
              onClick={() => setCurrentPhotoIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="name-age">
          <h1>{user.name}, {user.age}</h1>
          <div className="location">
            <FiMapPin className="icon-sm" />
            <span>{user.city}</span>
          </div>
        </div>

        <div className="details-card">
          <div className="detail-item">
            <FiUser className="icon" />
            <div>
              <h3>About Me</h3>
              <p>{user.bio}</p>
            </div>
          </div>

          <div className="detail-item">
            <FiCamera className="icon" />
            <div>
              <h3>Profession</h3>
              <p>{user.profession}</p>
            </div>
          </div>
        </div>

        <div className="interests-section">
          <h2>Interests</h2>
          <div className="interest-tags">
            {user.interests.map((interest, index) => (
              <span key={index} className="tag">{interest}</span>
            ))}
          </div>
        </div>
      </div>
    </main>

    {/* Action Bar */}
    <div className="action-bar">
      <button 
        className="action-btn dislike"
        onClick={() => navigate(-1)}
      >
        <FiX className="icon-lg" />
      </button>
      
      <button 
        className={`action-btn super-like ${isSuperLiked ? 'active' : ''}`}
        onClick={() => setIsSuperLiked(!isSuperLiked)}
      >
        {isSuperLiked ? (
          <FaStar className="icon-lg" />
        ) : (
          <FiStar className="icon-lg" />
        )}
      </button>
      
      <button 
        className={`action-btn like ${isLiked ? 'active' : ''}`}
        onClick={() => setIsLiked(!isLiked)}
      >
        {isLiked ? (
          <FaHeart className="icon-lg" />
        ) : (
          <FiHeart className="icon-lg" />
        )}
      </button>
    </div>
  </div>
  )
}

export default ViewCard
