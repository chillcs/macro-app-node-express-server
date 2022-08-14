const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const cors = require('cors');
const server = http.createServer(app);
const PORT = process.env.PORT || 3500;

// CORS ---
const allowedOrigins = [
	'https://macro.cstudio.ca',
	'http://10.0.0.84:3000',
	'http://localhost:3000',
];
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// API ROUTES ---
app.get('/api/food', (req, res) => {
	res.sendFile(path.join(__dirname, 'data', 'food.json'));
});

app.post('/api/food/create', (req, res) => {
	const food = data.foods.find;
	res.json({
		id: req.body.id,
		quantity: req.body.quantity,
		unit: req.body.unit,
		name: req.body.name,
		fat: req.body.fat,
		carb: req.body.carb,
		protein: req.body.protein,
	});
});

app.get('/api/log', (req, res) => {
	res.sendFile(path.join(__dirname, 'data', 'log.json'));
});

const data = {
	logs: require('./data/log.json'),
	setLogs: function (data) {
		this.logs = data;
	},
};
console.log(data.logs);

app.delete('/api/log/delete', (req, res) => {
	const log = data.logs.find((logitem) => logitem.id === parseInt(req.body.id));
	if (!log) {
		return res.status(400).json({ message: `Log ID ${req.body.id} not found` });
	}
	const filteredArray = data.logs.filter(
		(logitem) => logitem.id !== parseInt(req.body.id)
	);
	data.setLogs([...filteredArray]);
	res.json(data.logs);
});

// LISTEN ---
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
