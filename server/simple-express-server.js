const express = require('express');
const cors = require('cors');

const app = express();

// In-memory data store
const patients = [];
let currentQueueNumber = 0;

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Request body:', req.body);
  }
  next();
});

// Routes
app.get('/api/queue', (req, res) => {
  res.json(patients.filter(p => p.status !== 'completed'));
});

app.post('/api/queue', (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { name, phone, issue } = req.body;
    
    // Increment queue number
    currentQueueNumber++;
    
    const newPatient = {
      id: Date.now().toString(),
      name,
      phone,
      issue,
      queueNumber: currentQueueNumber,
      status: 'waiting',
      joinedAt: new Date()
    };
    
    patients.push(newPatient);
    console.log('Added patient:', newPatient);
    
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/queue/status', (req, res) => {
  const waitingCount = patients.filter(p => p.status === 'waiting').length;
  const inProgressCount = patients.filter(p => p.status === 'in-progress').length;
  
  res.json({
    currentNumber: currentQueueNumber,
    waitingCount,
    inProgressCount
  });
});

app.put('/api/queue/:id/start', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  
  patient.status = 'in-progress';
  res.json(patient);
});

app.put('/api/queue/:id/complete', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  
  patient.status = 'completed';
  res.json(patient);
});

// Test route
app.get('/', (req, res) => {
  res.send('Doctor Queue API is running');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});