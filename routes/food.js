const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.route('/').get(foodController.getFood).post(foodController.createFood);

module.exports = router;
