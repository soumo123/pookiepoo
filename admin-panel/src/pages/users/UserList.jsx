import React from 'react';
import { Link } from 'react-router-dom';
import { PencilSquare, Trash, Search, Filter } from 'react-bootstrap-icons';
import './users.css';

const UserList = () => {


    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joined: '2023-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', joined: '2023-02-20' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2023-03-10' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Subscriber', status: 'Pending', joined: '2023-04-05' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', joined: '2023-05-12' },
    ];
    const getStatusBadge = (status) => {
        const statusMap = {
            Active: { class: 'bg-success-light text-success', icon: '●' },
            Inactive: { class: 'bg-secondary-light text-secondary', icon: '◌' },
            Pending: { class: 'bg-warning-light text-warning', icon: '⦿' }
        };
        return (
            <span className={`badge ${statusMap[status].class} rounded-pill d-flex align-items-center gap-2`}>
                <span className="status-indicator">{statusMap[status].icon}</span>
                {status}
            </span>
        );
    };

    return (
        <div className="container-fluid px-4 py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="h3 fw-bold text-dark mb-0">User Management</h1>
            <p className="text-muted mb-0">Manage your platform users efficiently</p>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <div className="search-container position-relative">
              <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <input 
                type="text" 
                className="form-control ps-5" 
                placeholder="Search users..." 
                style={{ minWidth: '280px' }}
              />
            </div>
            <button className="btn btn-light d-flex align-items-center gap-2 border">
              <Filter size={18} /> 
              <span>Filters</span>
            </button>
          </div>
        </div>
  
        <div className="table-container bg-white rounded-4 shadow-sm overflow-hidden">
          <table className="table table-hover mb-0">
            <thead className="table-header">
              <tr>
                <th className="ps-5 py-4">User</th>
                <th className="py-4">Email</th>
                <th className="py-4">Role</th>
                <th className="py-4">Status</th>
                <th className="py-4">Joined Date</th>
                <th className="pe-5 py-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="user-row align-middle">
                  <td className="ps-5 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="avatar bg-primary-light text-primary rounded-circle">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="fw-semibold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="text-muted">{user.email}</div>
                  </td>
                  <td className="py-3">
                    <span className="role-badge">{user.role}</span>
                  </td>
                  <td className="py-3">{getStatusBadge(user.status)}</td>
                  <td className="py-3">
                    {new Date(user.joined).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="pe-5 py-3 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <button className="btn btn-action">
                        <PencilSquare size={18} />
                      </button>
                      <button className="btn btn-action text-danger">
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4 px-3">
          <div className="text-muted">Showing 1-5 of 23 users</div>
          <nav>
            <ul className="pagination mb-0">
              <li className="page-item">
                <button className="page-link">&laquo;</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">3</button>
              </li>
              <li className="page-item">
                <button className="page-link">&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
}

export default UserList
