const Food = require('../model/Food');

const getFood = async (req, res) => {
	const foods = await Food.find();
	res.json(foods);
};

const createFood = async (req, res) => {
	const { name, unit, fat, carb, protein } = req.body;
	const result = await Food.create({
		name: name,
		unit: unit,
		fat: fat,
		carb: carb,
		protein: protein,
	});
	console.log(result);
};

module.exports = { getFood, createFood };
