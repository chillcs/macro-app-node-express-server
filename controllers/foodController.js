const data = {
	foods: require('../data/food.json'),
	setFoods: function (data) {
		this.foods = data;
	},
};

const getAllFoods = (req, res) => {
	res.json(data.foods);
};

const createNewFood = (req, res) => {
	const newFood = {
		id: data.foods?.length ? data.foods[data.foods.length - 1].id + 1 : 1,
		quantity: req.body.quantity,
		unit: req.body.unit,
		name: req.body.name,
		fat: req.body.fat,
		carb: req.body.carb,
		protein: req.body.protein,
	};

	if (!newFood.quantity || !newFood.unit || newFood.name) {
		return res.status(400).json({ message: 'Info required' });
	}

	data.setFoods([...data.foods, newFood]);
	res.status(201).json(data.foods);
};

const deleteFood = (req, res) => {
	const food = data.foods.find(
		(fooditem) => fooditem.id === parseInt(req.body.id)
	);
	if (!food) {
		return res
			.status(400)
			.json({ message: `Food ID ${req.body.id} not found` });
	}
	const filteredArray = data.foods.filter(
		(fooditem) => fooditem.id !== parseInt(req.body.id)
	);
	data.setFoods([...filteredArray]);
	res.json(data.foods);
};

const getFood = (req, res) => {
	const food = data.food.find(
		(fooditem) => fooditem.id === parseInt(req.params.id)
	);
	if (!food) {
		return res
			.status(400)
			.json({ message: `Food ID ${req.params.id} not found` });
	}
	res.json(food);
};

module.exports = {
	getAllFoods,
	createNewFood,
	deleteFood,
	getFood,
};
