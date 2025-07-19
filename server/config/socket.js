// Socket.io configuration
const socketIO = require('socket.io');
let io;

module.exports = {
  init: (httpServer) => {
    io = socketIO(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    
    io.on('connection', (socket) => {
      console.log('New client connected');
      
      socket.on('joinQueue', (patientData) => {
        // Broadcast to all clients that a new patient joined
        io.emit('queueUpdate');
      });
      
      socket.on('nextPatient', () => {
        // Broadcast to all clients that the queue has been updated
        io.emit('queueUpdate');
      });
      
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
    
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};