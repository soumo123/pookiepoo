import React, { useEffect, useState } from 'react';

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer);
  }, []);



  return (
    <div
      className={`alert ${alertClass} fixed top-4 right-4 z-50 shadow-lg min-w-[300px] transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      role="alert"
    >
      {message}
    </div>
  )
}

export default Notification