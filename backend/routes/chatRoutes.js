const express = require('express');
const { handleCourseChat } = require('../controllers/chatController');

const router = express.Router();

router.post('/', handleCourseChat);

module.exports = router;
