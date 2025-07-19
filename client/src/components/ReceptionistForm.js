import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import api from '../utils/api';

const ReceptionistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    doctor: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [queueNumber, setQueueNumber] = useState(null);

  const { name, age, phone, doctor } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await api.post('/api/queue', formData);
      
      console.log('Server response:', res.data);
      setQueueNumber(res.data.queueNumber);
      setSuccess(true);
      setFormData({ name: '', age: '', phone: '', doctor: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      if (err.response) {
        setError(`Server error: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        setError('No response from server. Please make sure the server is running.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const doctors = [
    'Dr. Smith',
    'Dr. Johnson',
    'Dr. Williams',
    'Dr. Brown',
    'Dr. Jones'
  ];

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Patient Check-In</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {success && queueNumber && (
          <Alert variant="success">
            <h4>Patient has been added to the queue!</h4>
            <p className="mb-0">Queue number: <strong>{queueNumber}</strong></p>
          </Alert>
        )}
        
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Enter patient name"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={age}
                  onChange={onChange}
                  placeholder="Enter patient age"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  placeholder="Enter phone number"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Doctor</Form.Label>
                <Form.Select
                  name="doctor"
                  value={doctor}
                  onChange={onChange}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doc, index) => (
                    <option key={index} value={doc}>{doc}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Register Patient'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ReceptionistForm;