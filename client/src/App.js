import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import PatientPage from './pages/PatientPage';
import DoctorPage from './pages/DoctorPage';
import HomePage from './pages/HomePage';
import ReceptionistPage from './pages/ReceptionistPage';
import DisplayPage from './pages/DisplayPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <SocketProvider>
        <Navbar />
        <div className="container-fluid py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patient" element={<PatientPage />} />
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/receptionist" element={<ReceptionistPage />} />
            <Route path="/display" element={<DisplayPage />} />
          </Routes>
        </div>
      </SocketProvider>
    </Router>
  );
}

export default App;