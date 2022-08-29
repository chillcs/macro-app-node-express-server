require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Food = require('./model/Food');
const Log = require('./model/Log');
const PORT = process.env.PORT || 3500;

// MONGO ---
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
	} catch (err) {
		console.error(err);
	}
};
connectDB();

// CORS ---
const allowedOrigins = [
	'http://10.0.0.84:3000',
	'http://localhost:3000',
	'https://www.macro.cstudio.ca',
	'https://macro.cstudio.ca',
];
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// URLENCODED FORM DATA
app.use(express.urlencoded({ extended: false }));

// JSON ---
app.use(express.json());

// COOKIE PARSER ---
app.use(cookieParser());

// ROUTES ---

// Root ---
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Food (get) ---
app.get('/food', (req, res) => {
	Food.find((err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

// Food (create) ---
app.post('/food/create', (req, res) => {
	Food.create({
		name: req.body.name,
		unit: req.body.unit,
		fat: req.body.fat,
		carb: req.body.carb,
		protein: req.body.protein,
	});
});

// Food (delete) ---
app.delete('/food/delete/:id', (req, res) => {
	Food.findByIdAndDelete(req.params.id).then(() => {
		res.send();
	});
});

// Log (get) ---
app.get('/log', (req, res) => {
	Log.find((err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

// Log (create) ---
app.post('/log/create', (req, res) => {
	Log.create({
		quantity: req.body.quantity,
		unit: req.body.unit,
		name: req.body.name,
		fat: req.body.fat,
		carb: req.body.carb,
		protein: req.body.protein,
	});
});

// Log (delete) ---
app.delete('/log/delete/:id', (req, res) => {
	Log.findByIdAndDelete(req.params.id).then(() => {
		res.send();
	});
});

// Catch all 404 ---
app.all('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', '404.html'));
});

// LISTEN ---
mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
