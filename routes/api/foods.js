const express = require('express');
const router = express.Router();
const foodController = require('../../controllers/foodController');

router
	.route('/')
	.get(foodController.getAllFoods)
	.post(foodController.createNewFood)
	.delete(foodController.deleteFood);

router.route('/:id').get(foodController.getFood);

module.exports = router;
