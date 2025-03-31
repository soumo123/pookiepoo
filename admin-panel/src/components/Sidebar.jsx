import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { 
  LayoutSidebar, 
  HouseDoor, 
  Gear, 
  ChevronDoubleLeft,
  ChevronDoubleRight
} from 'react-bootstrap-icons';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar bg-dark text-white vh-100 ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        {!isCollapsed && <h4 className="mb-0">Admin Panel</h4>}
        <button 
          className="btn btn-link text-white"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronDoubleRight /> : <ChevronDoubleLeft />}
        </button>
      </div>

      <ListGroup variant="flush" className="p-3">
        <ListGroup.Item action as={Link} to="/" className="bg-dark text-white border-0">
          <HouseDoor className="me-3" />
          {!isCollapsed && 'Dashboard'}
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/settings" className="bg-dark text-white border-0">
          <Gear className="me-3" />
          {!isCollapsed && 'Settings'}
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/questions" className="bg-dark text-white border-0">
          <Gear className="me-3" />
          {!isCollapsed && 'Questions'}
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/users" className="bg-dark text-white border-0">
          <Gear className="me-3" />
          {!isCollapsed && 'Users'}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;