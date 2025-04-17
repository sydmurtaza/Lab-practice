const request = require('supertest');
const app = require('../src/app');
const { Event } = require('../src/models/eventModel');
const { Reminder } = require('../src/models/reminderModel');

describe('Reminder Management', () => {
    let eventId;

    beforeAll(async () => {
        // Create a test event
        const event = await Event.create({
            name: 'Test Event',
            description: 'This is a test event',
            date: new Date(Date.now() + 86400000), // Tomorrow
            time: '10:00',
            category: 'Meetings'
        });
        eventId = event._id;
    });

    afterAll(async () => {
        // Clean up test data
        await Event.deleteMany({});
        await Reminder.deleteMany({});
    });

    it('should create a reminder for an event', async () => {
        const response = await request(app)
            .post('/api/reminders')
            .send({
                eventId: eventId,
                reminderTime: new Date(Date.now() + 3600000) // 1 hour before
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Reminder created successfully');
    });

    it('should retrieve reminders for an event', async () => {
        const response = await request(app)
            .get(`/api/reminders/${eventId}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should delete a reminder', async () => {
        const reminder = await Reminder.create({
            eventId: eventId,
            reminderTime: new Date(Date.now() + 3600000) // 1 hour before
        });

        const response = await request(app)
            .delete(`/api/reminders/${reminder._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Reminder deleted successfully');
    });
});