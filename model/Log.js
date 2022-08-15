const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
	quantity: {
		type: Number,
		required: true,
	},
	unit: {
		type: String,
		required: true,
	},
	name: {
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

module.exports = mongoose.model('Log', logSchema);
