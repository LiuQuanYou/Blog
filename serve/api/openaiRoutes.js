const express = require('express');

// 从controller中引入
const { generateImage } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateimage', generateImage);

module.exports = router;
