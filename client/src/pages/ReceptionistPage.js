import React from 'react';
import { Container, Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import ReceptionistForm from '../components/ReceptionistForm';
import PatientList from '../components/PatientList';
import QueueStatus from '../components/QueueStatus';

const ReceptionistPage = () => {
  return (
    <Container>
      <div className="receptionist-header text-center mb-4">
        <h1>Receptionist Dashboard</h1>
        <p className="lead mb-0">Manage patient check-ins and monitor queue status</p>
      </div>
      
      <Row>
        <Col md={12} className="mb-4">
          <QueueStatus />
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Tab.Container defaultActiveKey="check-in">
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="check-in">Patient Check-In</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="queue">Queue Management</Nav.Link>
                  </Nav.Item>
                </Nav>
                
                <Tab.Content>
                  <Tab.Pane eventKey="check-in">
                    <div className="py-3">
                      <ReceptionistForm />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="queue">
                    <div className="py-3">
                      <PatientList />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReceptionistPage;