const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

const sendNotification = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending notification: ', error);
        }
        console.log('Notification sent: ' + info.response);
    });
};

const scheduleNotification = (event) => {
    const { reminderTime, userEmail } = event;
    const delay = new Date(reminderTime) - new Date();

    if (delay > 0) {
        setTimeout(() => {
            sendNotification(userEmail, `Reminder for ${event.name}`, `Don't forget about your event: ${event.description} at ${event.date} ${event.time}`);
        }, delay);
    }
};

module.exports = {
    sendNotification,
    scheduleNotification,
};