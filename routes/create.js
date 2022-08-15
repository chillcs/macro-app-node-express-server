const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/create', foodController.handleNewFood);

module.exports = router;
