const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

// In-memory data store
const patients = [];
let currentQueueNumber = 0;

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('joinQueue', () => {
    io.emit('queueUpdate');
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
// Get all patients in queue
app.get('/api/queue', (req, res) => {
  const activePatients = patients.filter(p => p.status !== 'completed');
  res.json(activePatients);
});

// Add a new patient to queue
app.post('/api/queue', (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { name, age, phone, doctor } = req.body;
    
    if (!name || !age || !phone || !doctor) {
      return res.status(400).json({ message: 'Name, age, phone, and doctor are required' });
    }
    
    // Increment queue number
    currentQueueNumber += 1;
    
    // Create new patient
    const patient = {
      id: Date.now().toString(),
      name,
      age: parseInt(age),
      phone,
      doctor,
      status: 'waiting',
      queueNumber: currentQueueNumber,
      joinedAt: new Date()
    };
    
    // Add to in-memory store
    patients.push(patient);
    console.log('Added patient:', patient);
    
    // Emit socket event
    io.emit('queueUpdate');
    
    res.status(201).json(patient);
  } catch (err) {
    console.error('Error adding patient:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get queue status
app.get('/api/queue/status', (req, res) => {
  try {
    const waitingCount = patients.filter(p => p.status === 'waiting').length;
    const inConsultationCount = patients.filter(p => p.status === 'in-consultation').length;
    
    // Find the current patient in consultation
    const currentPatient = patients.find(p => p.status === 'in-consultation');
    
    res.json({
      currentNumber: currentQueueNumber,
      waitingCount,
      inConsultationCount,
      currentPatient: currentPatient || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark patient as being seen
app.put('/api/queue/:id/start', (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = patients.find(p => p.id === id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patient.status = 'in-consultation';
    
    // Emit socket event
    io.emit('queueUpdate');
    
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark patient as completed
app.put('/api/queue/:id/complete', (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = patients.find(p => p.id === id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patient.status = 'completed';
    
    // Emit socket event
    io.emit('queueUpdate');
    
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Doctor Queue API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));