import React, { useState } from "react";
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from "react-router-dom";

const Swiper = () => {
  const [profiles] = useState([
    { id: 1, name: 'Alice', image: 'url1', bio: 'Loves hiking and photography' },
    { id: 2, name: 'Bob', image: 'url2', bio: 'Foodie and travel enthusiast' },
    { id: 3, name: 'Charlie', image: 'url3', bio: 'Musician and gamer' },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitX, setExitX] = useState('0%');
  const navigate = useNavigate();
  const handleSwipe = (direction) => {
    setExitX(direction === 'right' ? '200%' : '-200%');
  };

  const handleTransitionEnd = () => {
    if (exitX !== '0%') {
      setActiveIndex((prev) => prev + 1);
      setExitX('0%');
    }
  };

  const currentProfiles = profiles.slice(activeIndex, activeIndex + 3);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });
  return (
    <div className="swiper-wrapper">
      <div className="swiper-container">
        {profiles.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💔</div>
            <h2>No Profiles Found</h2>
            <p>Check back later or try refreshing!</p>
          </div>
        ) : currentProfiles.length > 0 ? (
          currentProfiles.map((profile, index) => (
            <div
              key={profile.id}
              {...(index === 0 ? swipeHandlers : {})}
              className="card"
              onClick={() => navigate('/profile', { state: { profile } })}
              style={{
                zIndex: -index,
                transform: `translateX(${index === 0 ? exitX : '0%'}) 
                       scale(${1 - index * 0.05})
                       rotate(${index === 0 ? (exitX === '200%' ? 30 : exitX === '-200%' ? -30 : 0) : 0}deg)`,
                top: `${index * 20}px`,
              }}
              onTransitionEnd={index === 0 ? handleTransitionEnd : undefined}
            >
              <div className="card-header">
                <img src={profile.image} alt={profile.name} className="card-image" />
                <div className="card-badge">NEW</div>
              </div>
              <div className="card-content">
                <h2>{profile.name}, {profile.age}</h2>
                <p className="bio">{profile.bio}</p>
                <div className="interests">
                  {profile.interests?.map((interest, i) => (
                    <span key={i} className="interest-tag">#{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🌟</div>
            <h2>You've Seen Everyone!</h2>
            <p>Check back later for new matches</p>
          </div>
        )}
      {
        console.log("profiles==",profiles)
      }
        {profiles.length > 0 ? (
          <div className="buttons">
            <button className="dislike-btn" onClick={() => handleSwipe('left')}>
              ❌
            </button>
            <button className="like-btn" onClick={() => handleSwipe('right')}>
              ❤️
            </button>
          </div>
        ):("")}
      </div>
      <nav className="bottom-nav">
        <button className="nav-item active">
          {/* <FaHome className="nav-icon" /> */}
          <i class="bi bi-house-door-fill nav-icon"></i>
          <span>Discover</span>
        </button>
        <button className="nav-item">
          {/* <FaComments className="nav-icon" /> */}
          <i class="bi bi-chat-left-fill nav-icon"></i>
          <span>Matches</span>
        </button>
        <button className="nav-item">
          {/* <FaHeart className="nav-icon" /> */}
          <i class="bi bi-heart-fill nav-icon"></i>
          <span>Likes</span>
        </button>
        <button className="nav-item">
          {/* <FaUser className="nav-icon" /> */}
          <i class="bi bi-person-fill nav-icon"></i>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  )
}

export default Swiper