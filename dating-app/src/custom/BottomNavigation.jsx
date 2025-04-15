import React from 'react'
import { FiHeart, FiMessageCircle, FiUser, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
    const navigate = useNavigate()

    const handleRedirect = (e)=>{
        if(e===1){
            navigate("/")
        }else if(e===2){
            navigate("messages")
        }else if(e===3){
            navigate("/likes")
        }else if(e===4){
            navigate("/view")
        }
    }

  return (
    <nav className="bottom-nav">
        <button className="nav-item active" onClick={()=>handleRedirect(1)}>
          <FiHome className="nav-icon" size={24} />
          <span>Discover</span>
        </button>
        <button className="nav-item" onClick={()=>handleRedirect(2)}>
          <FiMessageCircle className="nav-icon" size={24} />
          <span>Chats</span>
        </button>
        <button className="nav-item">
          <FiHeart className="nav-icon" size={24} onClick={()=>handleRedirect(3)}/>
          <span>Likes</span>
        </button>
        <button className="nav-item">
          <FiUser className="nav-icon" size={24} onClick={()=>handleRedirect(4)}/>
          <span>Profile</span>
        </button>
      </nav>
  )
}

export default BottomNavigation