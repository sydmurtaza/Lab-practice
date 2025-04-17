const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
router.post('/', eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Get an event by ID
router.get('/:id', eventController.getEventById);

// Update an event by ID
router.put('/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/:id', eventController.deleteEvent);

// Get upcoming events
router.get('/upcoming', eventController.getUpcomingEvents);

// Get events by category
router.get('/category/:category', eventController.getEventsByCategory);

// Get events by reminder status
router.get('/reminders/:status', eventController.getEventsByReminderStatus);

module.exports = router;