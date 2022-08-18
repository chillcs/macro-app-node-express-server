const Log = require('../model/Log');

const getLog = async (req, res) => {
	const logs = await Log.find();
	if (!logs) return res.status(204).json({ message: 'No log found' });
	res.json(logs);
};

const createLog = async (req, res) => {
	const { quantity, unit, name, fat, carb, protein } = req.body;
	try {
		const result = await Log.create({
			quantity: quantity,
			unit: unit,
			name: name,
			fat: fat,
			carb: carb,
			protein: protein,
		});
		console.log(result);
		res.status(201).json({ success: 'New log created' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getLog, createLog };
