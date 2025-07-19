import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import api from '../utils/api';

const PatientForm = () => {
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
      // Use the api utility instead of direct axios call
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
        setError('No response from server. Please make sure the server is running on port 5000.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Join the Queue</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {success && queueNumber && (
          <Alert variant="success">
            <h4>You've been added to the queue!</h4>
            <p className="mb-0">Your queue number is: <strong>{queueNumber}</strong></p>
          </Alert>
        )}
        
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={age}
              onChange={onChange}
              placeholder="Enter your age"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="Enter your phone number"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Select Doctor</Form.Label>
            <Form.Select
              name="doctor"
              value={doctor}
              onChange={onChange}
              required
            >
              <option value="">Choose a doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Johnson">Dr. Johnson</option>
              <option value="Dr. Williams">Dr. Williams</option>
              <option value="Dr. Brown">Dr. Brown</option>
              <option value="Dr. Jones">Dr. Jones</option>
            </Form.Select>
          </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100" 
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Join Queue'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PatientForm;