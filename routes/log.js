const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.route('/').get(logController.getLog).post(logController.createLog);

module.exports = router;
