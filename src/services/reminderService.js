const Reminder = require('../models/reminderModel'); // Assuming a reminder model exists
const Event = require('../models/eventModel');
const { sendNotification } = require('../utils/notification');

const createReminder = async (eventId, reminderTime) => {
    const event = await Event.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }

    const reminder = new Reminder({
        eventId,
        reminderTime,
        userId: event.userId // Assuming the event has a userId field
    });

    await reminder.save();
    scheduleNotification(reminder);
    return reminder;
};

const scheduleNotification = (reminder) => {
    const timeUntilReminder = new Date(reminder.reminderTime) - new Date();
    if (timeUntilReminder > 0) {
        setTimeout(() => {
            sendNotification(reminder.userId, `Reminder for event: ${reminder.eventId}`);
        }, timeUntilReminder);
    }
};

const getRemindersForUser = async (userId) => {
    return await Reminder.find({ userId });
};

module.exports = {
    createReminder,
    getRemindersForUser
};