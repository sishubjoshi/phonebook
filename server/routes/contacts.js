const express = require('express');
const router = express.Router();

// model
const Contact = require('../models/Contact');

/**
 * @route GET /contacts/
 * @description Gets the list of all contacts
 */
router.get('/', (req, res) => {
	Contact.find().then((contacts) => {
		if (contacts) {
			res.json(contacts);
		} else {
			res.send('hmmm no');
		}
	});
});

/**
 * @route POST /contacts/delete
 * @description Adds a new contact
 */
router.post('/add', (req, res) => {
	// res.send(req.body);
	// const data = req.body.name;
	// console.log(data);
	Contact.findOne({ number: req.body.number }).then((contact) => {
		if (contact) {
			res.send('numebr already exists');
		} else {
			const newContact = new Contact({
				number: req.body.number,
				name: req.body.name
			});
			newContact.save().then((contact) => res.json(contact)).catch((err) => console.log(err));
		}
	});
	// res.send(req.body);
});

/**
 * @route DELETE /contacts/delete
 * @description deleted the contact if already present
 */

router.delete('/delete', (req, res) => {
	Contact.findOneAndDelete({ number: req.body.number })
		.then((contact) => res.send('removed'))
		.catch((err) => console.log(err));
});

module.exports = router;
