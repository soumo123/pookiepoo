import React, { useState } from "react";
import { useSwipeable } from 'react-swipeable';
import { FiHeart, FiX, FiStar} from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const Swiper = () => {
  const [profiles] = useState([
    { 
      id: 1, 
      name: 'Alice', 
      age: 27,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 
      bio: 'Loves hiking and photography',
      interests: ['Adventure', 'Coffee', 'Nature']
    },
    { 
      id: 2, 
      name: 'Bob', 
      age: 29,
      image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80', 
      bio: 'Foodie and travel enthusiast',
      interests: ['Travel', 'Cooking', 'Wine']
    },
    { 
      id: 3, 
      name: 'Charlie', 
      age: 25,
      image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1366&q=80', 
      bio: 'Musician and gamer',
      interests: ['Music', 'Gaming', 'Tech']
    },
  ]);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitX, setExitX] = useState('0%');

  const handleSwipe = (direction) => {
    setExitX(
      direction === 'right' ? '100%' : 
      direction === 'left' ? '-100%' : 
      direction === 'up' ? '-100%' : '0%'
    );
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
    onSwipedUp: () => handleSwipe('up'),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });
  return (
    <div className="app-container">
      <div className="cards-container">
        {
          profiles.length === 0 ? (
            <div className="empty-state">
            <div className="empty-icon">💔</div>
            <h2>No Profiles Found</h2>
            <p>Check back later or try refreshing!</p>
          </div>
          ): currentProfiles.length > 0 ? (
            currentProfiles.map((profile, index) => (
              <div
                key={profile.id}
                {...(index === 0 ? swipeHandlers : {})}
                className="profile-card"
                style={{
                  zIndex: profiles.length - index,
                  transform: `translateX(${index === 0 ? exitX : '0%'}) 
                         scale(${1 - index * 0.03})`,
                  filter: `brightness(${1 - index * 0.1})`,
                }}
                onTransitionEnd={index === 0 ? handleTransitionEnd : undefined}
              >
                <div className="card-image-container">
                  <img src={profile.image} alt={profile.name} className="card-image" />
                  <div className="card-gradient-overlay" />
                  
                  <div className="card-content">
                    <div className="card-header">
                      <h2>{profile.name}, {profile.age}</h2>
                      <p className="card-distance">📍 Within 5 miles</p>
                    </div>
                    
                    <div className="card-details">
                      <p className="bio">{profile.bio}</p>
                      <div className="interests">
                        {profile.interests.map((interest, i) => (
                          <span key={i} className="interest-tag">#{interest}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ):(  <div className="empty-state">
            <div className="empty-icon">🌟</div>
            <h2>You've Seen Everyone!</h2>
            <p>Check back later for new matches</p>
          </div>)
        }
       

        <div className="action-buttons">
          <button 
            className="action-btn dislike-btn" 
            onClick={() => handleSwipe('left')}
            aria-label="Dislike"
          >
            <FiX size={28} />
          </button>
          
          <button 
            className="action-btn superlike-btn" 
            onClick={() => handleSwipe('up')}
            aria-label="Super Like"
          >
            <FiStar size={28} />
          </button>
          
          <button 
            className="action-btn like-btn" 
            onClick={() => handleSwipe('right')}
            aria-label="Like"
          >
            <FiHeart size={28} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Swiper