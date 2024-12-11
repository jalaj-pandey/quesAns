const express = require('express');
const router = express.Router();
const { askQuestion } = require('../controllers/openAi');

router.post('/question', askQuestion);

module.exports = router;
