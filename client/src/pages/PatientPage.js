import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PatientForm from '../components/PatientForm';
import QueueStatus from '../components/QueueStatus';

const PatientPage = () => {
  return (
    <Container>
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <h1 className="text-center mb-4">Patient Portal</h1>
        </Col>
      </Row>
      
      <Row>
        <Col md={6} className="mb-4">
          <QueueStatus />
        </Col>
        
        <Col md={6}>
          <PatientForm />
        </Col>
      </Row>
    </Container>
  );
};

export default PatientPage;