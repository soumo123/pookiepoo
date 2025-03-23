import React, { useState } from "react";
import { useSwipeable } from 'react-swipeable';


const Swiper = () => {
    const [profiles] = useState([
        { id: 1, name: 'Alice', image: 'url1', bio: 'Loves hiking and photography' },
        { id: 2, name: 'Bob', image: 'url2', bio: 'Foodie and travel enthusiast' },
        { id: 3, name: 'Charlie', image: 'url3', bio: 'Musician and gamer' },
      ]);
      const [activeIndex, setActiveIndex] = useState(0);
      const [exitX, setExitX] = useState('0%');
    
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

    {profiles.length > 0 && (
      <div className="buttons">
        <button className="dislike-btn" onClick={() => handleSwipe('left')}>
          ❌
        </button>
        <button className="like-btn" onClick={() => handleSwipe('right')}>
          ❤️
        </button>
      </div>
    )}
  </div>
  )
}

export default Swiper