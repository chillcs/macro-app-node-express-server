const Food = require('../model/Food');

const getFood = async (req, res) => {
	const foods = await Food.find();
	if (!foods) return res.status(204).json({ message: 'No food found' });
	res.json(foods);
};

const createFood = async (req, res) => {
	const { name, unit, fat, carb, protein } = req.body;
	try {
		const result = await Food.create({
			name: name,
			unit: unit,
			fat: fat,
			carb: carb,
			protein: protein,
		});
		console.log(result);
		res.status(201).json({ success: 'New food created' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getFood, createFood };
