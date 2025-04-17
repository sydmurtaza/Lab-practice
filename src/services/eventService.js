const Event = require('../models/eventModel');
const User = require('../models/userModel');

// Create a new event
const createEvent = async (eventData) => {
    const event = new Event(eventData);
    return await event.save();
};

// Get all upcoming events for a user
const getUpcomingEvents = async (userId) => {
    const currentDate = new Date();
    return await Event.find({ userId, date: { $gte: currentDate } }).sort({ date: 1 });
};

// Get events by category
const getEventsByCategory = async (userId, category) => {
    const currentDate = new Date();
    return await Event.find({ userId, category, date: { $gte: currentDate } }).sort({ date: 1 });
};

// Update an event
const updateEvent = async (eventId, updateData) => {
    return await Event.findByIdAndUpdate(eventId, updateData, { new: true });
};

// Delete an event
const deleteEvent = async (eventId) => {
    return await Event.findByIdAndDelete(eventId);
};

// Set reminder for an event
const setReminder = async (eventId, reminderTime) => {
    const event = await Event.findById(eventId);
    if (event) {
        event.reminderTime = reminderTime;
        await event.save();
        // Logic to schedule notification can be added here
    }
};

module.exports = {
    createEvent,
    getUpcomingEvents,
    getEventsByCategory,
    updateEvent,
    deleteEvent,
    setReminder,
};