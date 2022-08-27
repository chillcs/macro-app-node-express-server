require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbCon');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

// MONGODB ---
connectDB();

// CORS ---
app.use(cors(corsOptions));

// FOR URLENCODED FORM DATA
app.use(express.urlencoded({ extended: false }));

// FOR JSON ---
app.use(express.json());

// COOKIE PARSER ---
app.use(cookieParser());

// ROUTES ---
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));
app.use('/food', require('./routes/food'));
app.use('/log', require('./routes/log'));

app.all('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({ message: '404 Not Found' });
	} else {
		res.type('txt').send('404 Not Found');
	}
});

// LISTEN ---
mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
