import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Favorite, Close, Explore, Chat, Person } from '@mui/icons-material';

const profiles = [
    { name: "Jessica Parker", age: 23, bio: "Professor Tower", image: "https://source.unsplash.com/random/400x600/?woman" },
    { name: "Comite Snow", age: 23, bio: "Joy", image: "https://source.unsplash.com/random/400x600/?man" },
    { name: "Dead Jackson", age: 25, bio: "Professor Tower", image: "https://source.unsplash.com/random/400x600/?woman" },
  ];

const Dummy = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true
  });

  const handleSwipe = (direction) => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  return (
    <div className=" vh-100 d-flex flex-column">
      {/* Header */}
      <header className="text-center py-3 bg-white shadow-sm">
        <h3 className="text-primary mb-0">Discover</h3>
      </header>

      {/* Main Card Area */}
      <div className="flex-grow-1 position-relative" {...handlers}>
        {profiles.map((profile, index) => (
          <ProfileCard 
            key={index}
            profile={profile}
            active={index === currentIndex}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-4 py-4 bg-white">
        <button 
          className="btn btn-lg btn-outline-secondary rounded-circle"
          onClick={() => handleSwipe('left')}
        >
          <Close fontSize="large" />
        </button>
        <button 
          className="btn btn-lg btn-danger rounded-circle"
          onClick={() => handleSwipe('right')}
        >
          <Favorite fontSize="large" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="navbar fixed-bottom navbar-light bg-white border-top">
        <div className="container justify-content-around">
          <button className="btn btn-link text-primary">
            <Explore fontSize="large" />
          </button>
          <button className="btn btn-link text-muted">
            <Chat fontSize="large" />
          </button>
          <button className="btn btn-link text-muted">
            <Person fontSize="large" />
          </button>
        </div>
      </nav>
    </div>
  )
}



const ProfileCard = ({ profile, active }) => (
    <div className={`position-absolute w-100 h-100 p-3 ${active ? '' : 'd-none'}`}>
      <div className="card h-100 overflow-hidden">
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="card-img h-100 object-fit-cover" 
        />
        <div className="card-img-overlay d-flex flex-column justify-content-end gradient-overlay">
          <h2 className="text-white mb-0">
            {profile.name}, <span>{profile.age}</span>
          </h2>
          <p className="text-white mb-0">{profile.bio}</p>
        </div>
      </div>
    </div>
  );

export default Dummy