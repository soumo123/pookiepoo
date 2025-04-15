import React,{useState} from 'react'
import { FiChevronLeft, FiSearch, FiMoreVertical, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Message = () => {
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
    const conversations = [
        { name: 'Emile', time: '25 min', distance: '35 km', message: 'helooooooo dsnfbaskjbfa bjdsfjkabsfasd' },
        { name: 'Abigail Tartre', time: '27 min', message: '' },
        { name: 'Ericheth', time: '30 min', message: 'Ok, step you then.' },
        { name: 'Prustage', time: '50 min', message: 'Hey What\'s up, long time.' },
        { name: 'Chloe', time: '60 min', message: 'Hello how are you?' },
        { name: 'Gome', time: '11', message: 'taxi' },
      ];

      const handleNavigate =()=>{
        navigate("/")
      } 
      const handleSearchToggle = () => {
        setShowSearch(!showSearch);
        if (showSearch) setSearchQuery('');
      };

  return (
    <div className="messages-container">
      <div className="messages-header">
        <button className="icon-button" onClick={handleNavigate}>
          <FiChevronLeft size={24} />
        </button>
        {showSearch ? (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>
        ) : (
          <h2>Messages</h2>
        )}

        <div className="header-icons">
        <button className="icon-button" onClick={handleSearchToggle}>
            {showSearch ? <FiX size={20} /> : <FiSearch size={20} />}
          </button>
          <FiMoreVertical size={20} />
        </div>
      </div>

      <div className="activities-section">
        <h3 className="section-title">Activities</h3>
        <div className="active-users">
          {['You', 'Emma', 'Avo', 'Sophie',"sadasdasd","asdasdad","adadada","adadadada","adadd"].map((user, index) => (
            <div key={index} className="active-user">
              <div className="user-avatar">
                {index === 0 && <div className="online-status" />}
              </div>
              <span>{user}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="conversations-list">
        <h3 className="section-title">Messages</h3>
        {conversations.map((convo, index) => (
          <div key={index} className="conversation-item">
            <div className="avatar-container">
              <div className="user-avatar" />
              {index < 2 && <div className="unread-badge" />}
            </div>
            
            <div className="conversation-details">
              <div className="conversation-header">
                <h4>{convo.name}</h4>
                <span className="time-distance">
                  {convo.time}{convo.distance && ` • ${convo.distance}`}
                </span>
              </div>
              <p className="message-preview">{convo.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Message