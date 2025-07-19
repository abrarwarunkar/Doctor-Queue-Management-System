import React from 'react';
import { Container } from 'react-bootstrap';
import PublicDisplay from '../components/PublicDisplay';

const DisplayPage = () => {
  return (
    <Container fluid className="p-4 display-page">
      <div className="text-center mb-4">
        <h1>Patient Queue Display</h1>
      </div>
      
      <PublicDisplay />
      
      <div className="text-center mt-5">
        <p className="text-muted">This display updates automatically in real-time</p>
      </div>
    </Container>
  );
};

export default DisplayPage;