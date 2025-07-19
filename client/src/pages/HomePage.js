import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QueueStatus from '../components/QueueStatus';

const HomePage = () => {
  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <h1 className="display-4 mb-4">Doctor Queue Management System</h1>
          <p className="lead">
            A real-time queue management system for doctor's clinics.
            Efficiently manage patient flow and reduce waiting times.
          </p>
        </Col>
      </Row>
      
      <QueueStatus />
      
      <Row>
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 queue-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Receptionist</Card.Title>
              <Card.Text>
                Register walk-in patients and manage the queue from the front desk.
              </Card.Text>
              <div className="mt-auto">
                <Button as={Link} to="/receptionist" variant="info" className="w-100">
                  Receptionist Portal
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 queue-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Doctor</Card.Title>
              <Card.Text>
                Manage your patient queue efficiently and update patient status.
              </Card.Text>
              <div className="mt-auto">
                <Button as={Link} to="/doctor" variant="success" className="w-100">
                  Doctor Portal
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 queue-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Patient</Card.Title>
              <Card.Text>
                Join the virtual queue and track your position in real-time.
              </Card.Text>
              <div className="mt-auto">
                <Button as={Link} to="/patient" variant="primary" className="w-100">
                  Patient Portal
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 queue-card">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Waiting Area Display</Card.Title>
              <Card.Text>
                Public display for the waiting area showing current and upcoming patients.
              </Card.Text>
              <div className="mt-auto">
                <Button as={Link} to="/display" variant="secondary" className="w-100">
                  Public Display
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;