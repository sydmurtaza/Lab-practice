const express = require('express');
const { setReminder, getReminders } = require('../controllers/reminderController');

const router = express.Router();

router.post('/set', setReminder);
router.get('/', getReminders);

module.exports = router;