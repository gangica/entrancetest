import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';

const AccountBox = ({
  user
}) => {
  const { displayName = "" } = user;

  return (
    <Col md="3" lg="3" className="d-flex align-items-center justify-content-end py-2 mx-4">
      <div className="mx-2" style={{ lineHeight: '1rem', textAlign: 'right' }}>
        <div>{displayName}</div>
        <div 
          style={{ fontSize: 12, color: '#B9B9C3' }}
        >
          Available
        </div>
      </div>
      <div className="position-relative">
        <Avatar />
        <div 
          className="position-absolute rounded-circle" 
          style={{ 
            backgroundColor: '#28C76F',
            outline: '2px solid white',
            margin: 1,
            width: 8, 
            height: 8,
            bottom: 0,
            right: 0
          }}></div>
      </div>
    </Col>
  );
}

export default AccountBox;
