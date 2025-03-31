import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Questions from './pages/questions/Questions';
import Addquestion from './pages/questions/Addquestion';
import Listofquestions from './pages/questions/Listofquestions';
import UserList from './pages/users/UserList';
import Viewuser from './pages/users/Viewuser';


const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="wrapper d-flex">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className="main-content flex-grow-1">
        <TopHeader title={window.location.pathname.slice(1) || 'Dashboard'} />
        
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/addquestion" element={<Addquestion />} />
            <Route path="/catques/:name" element={<Listofquestions />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/viewuser" element={<Viewuser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;