import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import api from '../utils/api';
import { useSocket } from '../context/SocketContext';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { queueUpdated } = useSocket();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/queue');
        setPatients(res.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [queueUpdated]); // Re-fetch when queue is updated

  const handleStartPatient = async (id) => {
    try {
      await api.put(`/api/queue/${id}/start`);
      // Socket update will trigger re-fetch
    } catch (err) {
      console.error('Error starting patient:', err);
    }
  };

  const handleCompletePatient = async (id) => {
    try {
      await api.put(`/api/queue/${id}/complete`);
      // Socket update will trigger re-fetch
    } catch (err) {
      console.error('Error completing patient:', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'waiting':
        return <Badge bg="warning">Waiting</Badge>;
      case 'in-consultation':
        return <Badge bg="primary">In Consultation</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return <p className="text-center">Loading patients...</p>;
  }

  if (patients.length === 0) {
    return <p className="text-center">No patients in the queue.</p>;
  }

  // Group patients by doctor
  const patientsByDoctor = {};
  patients.forEach(patient => {
    if (!patientsByDoctor[patient.doctor]) {
      patientsByDoctor[patient.doctor] = [];
    }
    patientsByDoctor[patient.doctor].push(patient);
  });

  return (
    <div>
      <h3 className="mb-4">Patient Queue</h3>
      
      {Object.keys(patientsByDoctor).map(doctor => (
        <div key={doctor} className="mb-4">
          <h4 className="doctor-heading">{doctor}</h4>
          <Row>
            {patientsByDoctor[doctor].map(patient => (
              <Col md={6} lg={4} key={patient.id || patient._id} className="mb-3">
                <Card className={`h-100 patient-card ${patient.status}`}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">
                        #{patient.queueNumber} - {patient.name}
                      </h5>
                      {getStatusBadge(patient.status)}
                    </div>
                    <Card.Text>
                      <strong>Age:</strong> {patient.age}
                    </Card.Text>
                    <Card.Text>
                      <strong>Phone:</strong> {patient.phone}
                    </Card.Text>
                    <Card.Text>
                      <strong>Joined:</strong> {new Date(patient.joinedAt).toLocaleString()}
                    </Card.Text>
                    
                    <div className="d-flex justify-content-end mt-3">
                      {patient.status === 'waiting' && (
                        <Button 
                          variant="primary" 
                          onClick={() => handleStartPatient(patient.id || patient._id)}
                        >
                          Start Consultation
                        </Button>
                      )}
                      {patient.status === 'in-consultation' && (
                        <Button 
                          variant="success" 
                          onClick={() => handleCompletePatient(patient.id || patient._id)}
                        >
                          Complete Consultation
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default PatientList;