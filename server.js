const express = require('express');
const app = express();
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

app.use('/api/user', auth);

//connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
	console.log('connected to db')
);

//middleware
app.use(express.json());

app.listen(5100, () => console.log('Server is running'));
