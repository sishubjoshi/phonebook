const express = require('express');
const app = express();
const contact = require('./routes/contacts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to db
const db = require('./config/keys').mongoURI;
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) //removed Depricated {urlParser: true}
	.then(() => {
		console.log('MongoDB Connected!');
	})
	.catch((err) => console.log(err));

// testing
app.get('/', (req, res) => {
	res.send('Hello world!');
});

// routes
app.use('/contacts', contact);

app.listen(5000);
