const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'in-consultation', 'completed'],
    default: 'waiting'
  },
  queueNumber: {
    type: Number,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', PatientSchema);