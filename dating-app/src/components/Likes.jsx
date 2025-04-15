import React from 'react'
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Likes = () => {
    const navigate = useNavigate();
  
    // Sample matches data
    const matches = [
      { id: 1, name: 'Rengan', age: 24, photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { id: 2, name: 'Priya', age: 26, photo: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { id: 3, name: 'Arjun', age: 25, photo: 'https://randomuser.me/api/portraits/men/5.jpg' },
    ];
  return (
    <div className="matches-container">
      <div className="matches-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiChevronLeft size={24} />
        </button>
        <h1>Matches</h1>
      </div>

      <div className="matches-content">
        <p className="matches-description">
          This is a list of people who have liked you and your matches.
        </p>

        <div className="matches-list">
          {matches.map((match) => (
            <div key={match.id} className="match-card">
              <div className="match-profile">
                <img src={match.photo} alt={match.name} className="match-photo" />
                <div className="match-info">
                  <h2>{match.name}, {match.age}</h2>
                  <button className="connect-button">Connect</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Likes