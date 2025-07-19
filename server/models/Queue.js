const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
  name: {
    type: String,
    default: 'main',
    unique: true
  },
  currentNumber: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Queue', QueueSchema);