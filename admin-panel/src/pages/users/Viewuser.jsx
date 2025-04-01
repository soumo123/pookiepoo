import React, { useState } from 'react';
import { Card, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { 
  PersonFill, 
  Envelope, 
  Telephone,
  GeoAlt,
  Calendar,
  GenderAmbiguous,
  HeartFill,
  ArrowRightCircle,
  ArrowLeftCircle,
  Search 
} from 'react-bootstrap-icons';
import './users.css';

const Viewuser = () => {
  const [rightSearch, setRightSearch] = useState('');
  const [leftSearch, setLeftSearch] = useState('');

  // Sample user data
  const user = {
    image: 'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250',
    id: 'USER_1234',
    name: 'John Doe',
    address: '123 Main St, New York, USA',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    religion: 'Christian',
    email: 'john.doe@example.com',
    dob: '1990-05-15',
    gender: 'Male',
    isPro: true
  };

  const matches = [
    { id: 'MATCH_001', name: 'Alice Smith' },
    { id: 'MATCH_002', name: 'Emma Johnson' },
    { id: 'MATCH_003', name: 'Michael Brown' }
  ];

  const rightSwipes = [
    { id: 'RS_001', name: 'Sarah Wilson' },
    { id: 'RS_002', name: 'David Miller' },
    { id: 'RS_003', name: 'Sophia Davis' },
    { id: 'RS_004', name: 'Robert Johnson' },
    { id: 'RS_005', name: 'Jennifer Lopez' },
    { id: 'RS_006', name: 'William Smith' },
    { id: 'RS_007', name: 'Elizabeth Taylor' }
  ];

  const leftSwipes = [
    { id: 'LS_001', name: 'James Wilson' },
    { id: 'LS_002', name: 'Olivia Taylor' },
    { id: 'LS_003', name: 'Thomas Anderson' },
    { id: 'LS_004', name: 'Emily Clark' },
    { id: 'LS_005', name: 'Daniel White' }
  ];

  const filteredRight = rightSwipes.filter(u => 
    u.name.toLowerCase().includes(rightSearch.toLowerCase())
  );

  const filteredLeft = leftSwipes.filter(u => 
    u.name.toLowerCase().includes(leftSearch.toLowerCase())
  );


  return (
    <div className="user-profile-container p-4">
      {/* Section 1: Basic User Information */}
      <Card className="profile-card shadow-lg mb-4">
        <Card.Body>
          <Row>
            {/* User Image Column */}
            <Col md={4} className="text-center border-end">
              <div className="position-relative">
                <img
                  src={user.image}
                  alt="Profile"
                  className="img-thumbnail rounded-circle mb-3"
                  style={{ width: '200px', height: '200px' }}
                />
                {user.isPro && (
                  <span className="pro-badge">PRO</span>
                )}
              </div>
              <h4 className="fw-bold mt-2">{user.id}</h4>
            </Col>

            {/* User Details Column */}
            <Col md={8}>
              <div className="user-details-grid">
                <DetailItem icon={<PersonFill />} label="Name" value={user.name} />
                <DetailItem icon={<GeoAlt />} label="Address" value={user.address} />
                <DetailItem icon={<Telephone />} label="Phone" value={user.phone} />
                <DetailItem icon={<GeoAlt />} label="Country" value={user.country} />
                <DetailItem icon={<GenderAmbiguous />} label="Religion" value={user.religion} />
                <DetailItem icon={<Envelope />} label="Email" value={user.email} />
                <DetailItem icon={<Calendar />} label="Date of Birth" value={user.dob} />
                <DetailItem icon={<GenderAmbiguous />} label="Gender" value={user.gender} />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Section 2: Matched Users */}
      <Card className="shadow-lg mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold">
              <HeartFill className="text-danger me-2" />
              Matches ({matches.length})
            </h4>
          </div>
          
          <div className="row g-4">
            {matches.length > 0 ? (
              matches.map(match => (
                <Col key={match.id} md={6} lg={4}>
                  <div className="match-card p-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3">👤</div>
                      <div>
                        <h6 className="fw-bold mb-0">{match.name}</h6>
                        <small className="text-muted">{match.id}</small>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div className="text-center py-4 text-muted">
                No matches found
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Section 3 & 4: Swipe History */}
      <div className="row g-4">
        {/* Right Swipes */}
        <Col md={6}>
          <Card className="shadow-lg h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">
                  <ArrowRightCircle className="text-success me-2" />
                  Right Swipes ({rightSwipes.length})
                </h4>
                <div style={{ width: '250px' }}>
                  <InputGroup>
                    <InputGroup.Text>
                      <Search />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search right swipes"
                      value={rightSearch}
                      onChange={(e) => setRightSearch(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="swipe-list-container">
                <div className="swipe-list">
                  {filteredRight.map(swipe => (
                    <div key={swipe.id} className="swipe-item swipe-right">
                      <span>{swipe.name}</span>
                      <small className="text-muted">{swipe.id}</small>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Left Swipes */}
        <Col md={6}>
          <Card className="shadow-lg h-100">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">
                  <ArrowLeftCircle className="text-danger me-2" />
                  Left Swipes ({leftSwipes.length})
                </h4>
                <div style={{ width: '250px' }}>
                  <InputGroup>
                    <InputGroup.Text>
                      <Search />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search left swipes"
                      value={leftSearch}
                      onChange={(e) => setLeftSearch(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="swipe-list-container">
                <div className="swipe-list">
                  {filteredLeft.map(swipe => (
                    <div key={swipe.id} className="swipe-item swipe-left">
                      <span>{swipe.name}</span>
                      <small className="text-muted">{swipe.id}</small>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="detail-item">
    <span className="detail-icon">{icon}</span>
    <div>
      <small className="text-muted">{label}</small>
      <div className="fw-semibold">{value}</div>
    </div>
  </div>
);

export default Viewuser;