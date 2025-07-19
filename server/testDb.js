const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/doctorQueue')
  .then(() => {
    console.log('MongoDB connected successfully');
    // Close the connection after successful test
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });