# Doctor Queue Management System

A real-time patient queue management system for doctor's clinics using the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io for real-time updates.

## Features

- **Patient Check-In**: Receptionist interface for registering walk-in patients with name, age, contact number, and doctor selection
- **Dynamic Queue Management**: Automatic queue number assignment and patient status tracking
- **Real-Time Public Display**: Large screen view for waiting area showing current patient in consultation and next patients in queue
- **Doctor's Dashboard**: Interface for doctors to view patient details and manage consultations
- **Receptionist's Dashboard**: Central view to manage the entire queue and patient details
- **Patient Status Tracking**: Track if patients are Waiting, In Consultation, or have Completed their visit
- **Real-time Updates**: All changes reflect instantly across all interfaces using Socket.io

## Project Structure

```
Doctor app/
├── client/                 # React frontend
│   ├── public/             # Public assets
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── context/        # React context providers
│       ├── pages/          # Page components
│       └── utils/          # Utility functions
└── server/                 # Node.js backend
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── middleware/         # Express middleware
    ├── models/             # MongoDB models
    └── routes/             # API routes
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

### Server Setup

1. Clone the repository:
   ```
   git clone https://github.com/abrarwarunkar/Doctor-Queue-Management-System.git
   cd Doctor-Queue-Management-System
   ```

2. Navigate to the server directory:
   ```
   cd server
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/doctorQueue
   ```
   Note: Update the MONGO_URI if you're using MongoDB Atlas.

5. Start the server:
   ```
   npm run dev
   ```

### Client Setup

1. Navigate to the client directory:
   ```
   cd ../client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the client:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Receptionist Interface

1. Navigate to the Receptionist Portal
2. Use the Patient Check-In tab to register new patients
3. Enter patient name, age, phone number, and select a doctor
4. Submit the form to add the patient to the queue
5. Use the Queue Management tab to view and manage all patients

### Doctor Interface

1. Navigate to the Doctor Portal
2. View patients assigned to you
3. Click "Start Consultation" when you're ready to see a patient
4. Click "Complete Consultation" when you're done with a patient

### Public Display

1. Navigate to the Display page
2. This page shows the current patient in consultation and next patients in queue
3. Designed to be displayed on a large screen in the waiting area
4. Updates automatically in real-time

### Patient Interface

1. Navigate to the Patient Portal
2. Fill out the form with your name, age, phone number, and select a doctor
3. Submit the form to join the queue
4. You'll receive a queue number
5. Monitor the queue status in real-time

## Technologies Used

- **MongoDB**: Database for storing patient and queue information
- **Express.js**: Backend framework for handling API requests
- **React**: Frontend library for building user interfaces
- **Node.js**: Runtime environment for the server
- **Socket.io**: Real-time bidirectional communication
- **Bootstrap**: UI framework for responsive design
- **React Router**: Navigation between different pages
- **Axios**: HTTP client for API requests

## Troubleshooting

### Server Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running on your system or your MongoDB Atlas account is properly set up
   - Check the MONGO_URI in the .env file

2. **Port Already in Use**
   - Change the PORT in the .env file if port 5000 is already in use

### Client Issues

1. **API Connection Error**
   - Make sure the server is running on port 5000
   - Check that the API base URL in `src/utils/api.js` matches your server URL

2. **Socket.io Connection Error**
   - Ensure the Socket.io URL in `src/context/SocketContext.js` matches your server URL

## License

This project is licensed under the MIT License.