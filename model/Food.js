const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	unit: {
		type: String,
		required: true,
	},
	fat: {
		type: Number,
		required: true,
	},
	carb: {
		type: Number,
		required: true,
	},
	protein: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Food', foodSchema);
