import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const TopHeader = ({ title }) => {
  return (
    <div className="content-header p-3 bg-light border-bottom">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{title}</h4>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default TopHeader;