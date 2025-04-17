const Reminder = require('../models/reminderModel');
const Event = require('../models/eventModel');

// Create a new reminder for an event
exports.createReminder = async (req, res) => {
    try {
        const { eventId, reminderTime } = req.body;
        const event = await Event.findById(eventId);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const reminder = new Reminder({
            eventId,
            reminderTime,
            userId: req.user.id // Assuming user ID is available in req.user
        });

        await reminder.save();
        res.status(201).json({ message: 'Reminder created successfully', reminder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating reminder', error });
    }
};

// Get reminders for a user
exports.getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.user.id }).populate('eventId');
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reminders', error });
    }
};

// Delete a reminder
exports.deleteReminder = async (req, res) => {
    try {
        const { reminderId } = req.params;
        const reminder = await Reminder.findByIdAndDelete(reminderId);
        
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reminder', error });
    }
};