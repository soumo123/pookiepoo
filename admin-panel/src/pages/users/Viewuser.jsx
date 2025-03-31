import React, { useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";

const Viewuser = () => {
    const [searchRight, setSearchRight] = useState("");
  const [searchLeft, setSearchLeft] = useState("");

  const user = {
    image: "https://via.placeholder.com/120",
    id: "U12345",
    name: "John Doe",
    address: "123 Main St, City, Country",
    phone: "+1234567890",
    country: "USA",
    religion: "Christianity",
    email: "johndoe@example.com",
    dob: "1990-01-01",
    gender: "Male",
  };

  const matchedUsers = [
    { id: "M001", name: "Alice Smith" },
    { id: "M002", name: "Bob Johnson" },
  ];

  const rightSwiped = [
    { id: "R001", name: "Charlie Brown" },
    { id: "R002", name: "Diana Prince" },
  ];

  const leftSwiped = [
    { id: "L001", name: "Eve Adams" },
    { id: "L002", name: "Frank Miller" },
  ];

  const filteredRight = rightSwiped.filter((u) =>
    u.name.toLowerCase().includes(searchRight.toLowerCase())
  );
  const filteredLeft = leftSwiped.filter((u) =>
    u.name.toLowerCase().includes(searchLeft.toLowerCase())
  );
  

  return (
    <div className="container mt-4 user-profile">
      {/* User Basic Details */}
      <div className="card mb-4 shadow-sm user-card">
        <div className="card-body text-center">
          <img src={user.image} alt="User" className="user-image" />
          <h4 className="mt-3">{user.name}</h4>
          <p className="text-muted">ID: {user.id}</p>
          <div className="user-details">
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>Religion:</strong> {user.religion}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>DOB:</strong> {user.dob}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
          </div>
        </div>
      </div>

      {/* Matched Users */}
      <div className="card mb-4 shadow-sm user-card">
        <div className="card-body">
          <h5 className="section-title">Matched Users</h5>
          <ul className="user-list">
            {matchedUsers.map((m) => (
              <li key={m.id}>{m.name} (ID: {m.id})</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Swiped Users */}
      <div className="card mb-4 shadow-sm user-card">
        <div className="card-body">
          <h5 className="section-title">Right Swiped Users ({rightSwiped.length})</h5>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search Right Swiped Users"
            value={searchRight}
            onChange={(e) => setSearchRight(e.target.value)}
          />
          <ul className="user-list">
            {filteredRight.map((r) => (
              <li key={r.id}>{r.name} (ID: {r.id})</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Left Swiped Users */}
      <div className="card mb-4 shadow-sm user-card">
        <div className="card-body">
          <h5 className="section-title">Left Swiped Users ({leftSwiped.length})</h5>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search Left Swiped Users"
            value={searchLeft}
            onChange={(e) => setSearchLeft(e.target.value)}
          />
          <ul className="user-list">
            {filteredLeft.map((l) => (
              <li key={l.id}>{l.name} (ID: {l.id})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Viewuser
