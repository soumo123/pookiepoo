import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <i class="bi bi-arrow-left icon fs-4"></i>
      </button>
      <div className="header-logo" onClick={hanldeBack}></div>
      <button className="info-button">
        <i class="bi bi-info-circle icon fs-4"></i>
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
          <h1>{user.name}, {user.age} <i className="bi bi-patch-check-fill text-primary fs-5"></i></h1> 
          <div className="location">
            <i class="icon-sm bi bi-geo-alt"></i>
            <span>{user.city}</span>
          </div>
        </div>

        <div className="details-card">
          <div className="detail-item">
            <i class="icon bi bi-person"></i>
            <div>
              <h3>About Me</h3>
              <p>{user.bio}</p>
            </div>
          </div>

          <div className="detail-item">
          <i class="icon bi bi-camera"></i>
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
        <i class="bi bi-x-lg fs-2"></i>
      </button>
      
      <button 
        className={`action-btn super-like ${isSuperLiked ? 'active' : ''}`}
        onClick={() => setIsSuperLiked(!isSuperLiked)}
      >
        {isSuperLiked ? (
          <i class="bi bi-star fs-2"></i>
        ) : (
          <i class="bi bi-star fs-2"></i>
        )}
      </button>
      
      <button 
        className={`action-btn like ${isLiked ? 'active' : ''}`}
        onClick={() => setIsLiked(!isLiked)}
      >
        {isLiked ? (
          <i class="bi bi-heart fs-2"></i>
        ) : (
          <i class="bi bi-heart fs-2"></i>
        )}
      </button>
    </div>
  </div>
  )
}

export default ViewCard
