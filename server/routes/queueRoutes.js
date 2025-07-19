const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

// Get all patients in queue
router.get('/', queueController.getQueue);

// Add a new patient to queue
router.post('/', queueController.addPatient);

// Mark patient as being seen
router.put('/:id/start', queueController.startPatient);

// Mark patient as completed
router.put('/:id/complete', queueController.completePatient);

// Get queue status
router.get('/status', queueController.getQueueStatus);

module.exports = router;