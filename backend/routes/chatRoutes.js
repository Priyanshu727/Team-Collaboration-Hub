const express = require('express');
const { sendMessage } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/chat', authMiddleware, sendMessage);

module.exports = router;
