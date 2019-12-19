const express = require('express');
const app = express();
const contact = require('./routes/contacts');
const group = require('./routes/groups');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// connect to db
const db = require('./config/keys').mongoURI;
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) //removed Depricated {urlParser: true}
	.then(() => {
		console.log('MongoDB Connected!');
	})
	.catch((err) => console.log(err));

// testing
app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// routes
app.get('/groups', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'public', 'groups.html'));
});
app.use('/groups', group);
app.use('/contacts', contact);

app.listen(5000);
