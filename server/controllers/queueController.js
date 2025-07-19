const Patient = require('../models/Patient');
const Queue = require('../models/Queue');
const socketConfig = require('../config/socket');

// Get all patients in the queue
exports.getQueue = async (req, res) => {
  try {
    const patients = await Patient.find({ status: { $ne: 'completed' } }).sort('queueNumber');
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new patient to the queue
exports.addPatient = async (req, res) => {
  try {
    const { name, age, phone, doctor } = req.body;
    
    if (!name || !age || !phone || !doctor) {
      return res.status(400).json({ message: 'Name, age, phone, and doctor are required' });
    }
    
    // Get or create the queue
    let queue = await Queue.findOne({ name: 'main' });
    if (!queue) {
      queue = new Queue({ name: 'main' });
    }
    
    // Increment queue number
    queue.currentNumber += 1;
    await queue.save();
    
    // Create new patient
    const patient = new Patient({
      name,
      age: parseInt(age),
      phone,
      doctor,
      queueNumber: queue.currentNumber
    });
    
    await patient.save();
    
    // Emit socket event
    try {
      const io = socketConfig.getIO();
      io.emit('queueUpdate');
    } catch (socketErr) {
      console.error('Socket error:', socketErr);
    }
    
    res.status(201).json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark patient as being seen by doctor
exports.startPatient = async (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patient.status = 'in-consultation';
    await patient.save();
    
    // Emit socket event
    try {
      const io = socketConfig.getIO();
      io.emit('queueUpdate');
    } catch (socketErr) {
      console.error('Socket error:', socketErr);
    }
    
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark patient as completed
exports.completePatient = async (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    patient.status = 'completed';
    await patient.save();
    
    // Emit socket event
    try {
      const io = socketConfig.getIO();
      io.emit('queueUpdate');
    } catch (socketErr) {
      console.error('Socket error:', socketErr);
    }
    
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current queue status
exports.getQueueStatus = async (req, res) => {
  try {
    const queue = await Queue.findOne({ name: 'main' });
    const waitingCount = await Patient.countDocuments({ status: 'waiting' });
    const inConsultationCount = await Patient.countDocuments({ status: 'in-consultation' });
    
    // Find the current patient in consultation
    const currentPatient = await Patient.findOne({ status: 'in-consultation' });
    
    res.json({
      currentNumber: queue ? queue.currentNumber : 0,
      waitingCount,
      inConsultationCount,
      currentPatient: currentPatient || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};