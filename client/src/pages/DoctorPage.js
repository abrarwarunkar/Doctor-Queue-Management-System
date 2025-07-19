import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PatientList from '../components/PatientList';
import QueueStatus from '../components/QueueStatus';

const DoctorPage = () => {
  return (
    <Container>
      <div className="doctor-header text-center">
        <h1>Doctor's Dashboard</h1>
        <p className="lead mb-0">Manage your patient queue in real-time</p>
      </div>
      
      <Row>
        <Col md={12} className="mb-4">
          <QueueStatus />
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <PatientList />
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorPage;