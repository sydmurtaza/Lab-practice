const request = require('supertest');
const app = require('../src/app');
const Event = require('../src/models/eventModel');

describe('Event Management', () => {
    beforeEach(async () => {
        await Event.deleteMany({});
    });

    it('should create a new event', async () => {
        const response = await request(app)
            .post('/api/events')
            .send({
                name: 'Meeting',
                description: 'Project discussion',
                date: '2023-10-15',
                time: '10:00',
                category: 'Meetings'
            })
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Meeting');
    });

    it('should retrieve all upcoming events', async () => {
        await request(app)
            .post('/api/events')
            .send({
                name: 'Birthday Party',
                description: 'Celebration',
                date: '2023-10-20',
                time: '18:00',
                category: 'Birthdays'
            });

        const response = await request(app)
            .get('/api/events/upcoming')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should categorize events', async () => {
        await request(app)
            .post('/api/events')
            .send({
                name: 'Doctor Appointment',
                description: 'Annual check-up',
                date: '2023-10-22',
                time: '09:00',
                category: 'Appointments'
            });

        const response = await request(app)
            .get('/api/events?category=Appointments')
            .expect(200);

        expect(response.body[0].category).toBe('Appointments');
    });

    it('should set reminders for events', async () => {
        const eventResponse = await request(app)
            .post('/api/events')
            .send({
                name: 'Conference',
                description: 'Tech conference',
                date: '2023-10-25',
                time: '09:00',
                category: 'Meetings',
                reminder: { timeBefore: '1 hour' }
            })
            .expect(201);

        expect(eventResponse.body.reminder).toHaveProperty('timeBefore', '1 hour');
    });

    afterAll(async () => {
        await Event.deleteMany({});
    });
});