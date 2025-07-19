import React, { useState, useEffect } from 'react';
import { Card, Table, Alert } from 'react-bootstrap';
import api from '../utils/api';
import { useSocket } from '../context/SocketContext';

const PublicDisplay = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { queueUpdated } = useSocket();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get all patients in queue
        const patientsRes = await api.get('/api/queue');
        
        // Get queue status to get current patient
        const statusRes = await api.get('/api/queue/status');
        
        // Filter to get only waiting patients
        const waitingPatients = patientsRes.data.filter(p => p.status === 'waiting');
        
        // Sort by queue number
        waitingPatients.sort((a, b) => a.queueNumber - b.queueNumber);
        
        // Get the next 5 patients
        const nextPatients = waitingPatients.slice(0, 5);
        
        setPatients(nextPatients);
        setCurrentPatient(statusRes.data.currentPatient);
      } catch (err) {
        console.error('Error fetching data for public display:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queueUpdated]); // Re-fetch when queue is updated

  if (loading) {
    return <p className="text-center">Loading queue information...</p>;
  }

  return (
    <Card className="public-display mb-4">
      <Card.Body>
        <Card.Title className="text-center mb-4">
          <h2>Patient Queue Status</h2>
        </Card.Title>
        
        <div className="current-patient mb-4">
          <h3 className="text-center">Now Serving</h3>
          {currentPatient ? (
            <Alert variant="primary" className="text-center">
              <h1 className="display-1">{currentPatient.queueNumber}</h1>
              <h3>{currentPatient.name}</h3>
              <p>Please proceed to {currentPatient.doctor}</p>
            </Alert>
          ) : (
            <Alert variant="secondary" className="text-center">
              <h3>No patient currently in consultation</h3>
            </Alert>
          )}
        </div>
        
        <div className="next-patients">
          <h3 className="text-center mb-3">Up Next</h3>
          {patients.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Queue #</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient.id || patient._id}>
                    <td>{patient.queueNumber}</td>
                    <td>{patient.name}</td>
                    <td>{patient.doctor}</td>
                    <td>Waiting</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info" className="text-center">
              <p>No patients waiting in queue</p>
            </Alert>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PublicDisplay;