import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [queueUpdated, setQueueUpdated] = useState(false);

  useEffect(() => {
    // Connect to the socket server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Listen for queue updates
    newSocket.on('queueUpdate', () => {
      setQueueUpdated(prev => !prev); // Toggle to trigger re-renders
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, queueUpdated }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;