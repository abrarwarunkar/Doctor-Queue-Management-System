const Queue = require('../models/Queue');

// Initialize database with required documents
const initializeDB = async () => {
  try {
    // Check if main queue exists, create if not
    const mainQueue = await Queue.findOne({ name: 'main' });
    if (!mainQueue) {
      console.log('Creating main queue...');
      const newQueue = new Queue({ name: 'main', currentNumber: 0 });
      await newQueue.save();
      console.log('Main queue created successfully');
    } else {
      console.log('Main queue already exists');
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

module.exports = initializeDB;