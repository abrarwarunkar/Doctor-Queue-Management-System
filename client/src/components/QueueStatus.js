import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import api from '../utils/api';
import { useSocket } from '../context/SocketContext';

const QueueStatus = () => {
  const [status, setStatus] = useState({
    currentNumber: 0,
    waitingCount: 0,
    inConsultationCount: 0,
    currentPatient: null
  });
  const { queueUpdated } = useSocket();

  useEffect(() => {
    const fetchQueueStatus = async () => {
      try {
        const res = await api.get('/api/queue/status');
        setStatus(res.data);
      } catch (err) {
        console.error('Error fetching queue status:', err);
      }
    };

    fetchQueueStatus();
  }, [queueUpdated]); // Re-fetch when queue is updated

  return (
    <Card className="queue-status mb-4">
      <Card.Body>
        <Card.Title className="text-center mb-4">Current Queue Status</Card.Title>
        <Row>
          <Col md={4} className="text-center">
            <h2 className="text-primary">{status.currentNumber}</h2>
            <p className="text-muted">Current Queue Number</p>
          </Col>
          <Col md={4} className="text-center">
            <h2 className="text-warning">{status.waitingCount}</h2>
            <p className="text-muted">Patients Waiting</p>
          </Col>
          <Col md={4} className="text-center">
            <h2 className="text-success">{status.inConsultationCount}</h2>
            <p className="text-muted">In Consultation</p>
          </Col>
        </Row>
        
        {status.currentPatient && (
          <div className="current-patient-info mt-4 p-3 border rounded">
            <h5 className="mb-3">Currently In Consultation:</h5>
            <Row>
              <Col md={3}>
                <Badge bg="primary" className="p-2 fs-5">#{status.currentPatient.queueNumber}</Badge>
              </Col>
              <Col md={4}>
                <strong>Name:</strong> {status.currentPatient.name}
              </Col>
              <Col md={3}>
                <strong>Age:</strong> {status.currentPatient.age}
              </Col>
              <Col md={2}>
                <strong>Doctor:</strong> {status.currentPatient.doctor}
              </Col>
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default QueueStatus;