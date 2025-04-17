const Event = require('../models/eventModel');
const eventService = require('../services/eventService');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, time, category } = req.body;
        const newEvent = await eventService.createEvent({ name, description, date, time, category });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// Get all upcoming events
exports.getUpcomingEvents = async (req, res) => {
    try {
        const events = await eventService.getUpcomingEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error: error.message });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await eventService.updateEvent(id, req.body);
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await eventService.deleteEvent(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};

// Get events by category
exports.getEventsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const events = await eventService.getEventsByCategory(category);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events by category', error: error.message });
    }
};