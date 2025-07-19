import axios from 'axios';

// Create an instance of axios with a default base URL
const api = axios.create({
  baseURL: 'http://localhost:5000',  // Updated to port 5000 to match server
  headers: {
    'Content-Type': 'application/json'
  },
  // Add timeout to prevent long waiting
  timeout: 10000
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ response: { data: { message: 'Connection timeout - Is the server running?' } } });
    }
    if (!error.response) {
      return Promise.reject({ 
        response: { 
          data: { 
            message: 'Cannot connect to server - Please make sure the server is running on port 5000' 
          } 
        } 
      });
    }
    return Promise.reject(error);
  }
);

export default api;