const express = require('express');
const router = express.Router();

// model
const Contact = require('../models/Contact');

/**
 * @route GET /contacts/
 * @description Gets the list of all contacts
 */
router.get('/', (req, res) => {
	console.log('get em all');
	Contact.find().then((contacts) => {
		if (contacts) {
			res.send(contacts);
		} else {
			res.send({ message: 'no notes added yet.' });
		}
	});
});

router.get('/:c_id', (req, res) => {
	Contact.findOne({ _id: req.params.c_id })
		.then((contact) => {
			// const cont = contact
			res.send(contact);
		})
		.catch((err) => console.log(err));
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
 * @route UPDATE /contacts/update
 * @description Updates contact
 */
router.put('/update/:c_id', (req, res) => {
	Contact.findOneAndUpdate({ _id: req.params.c_id }, req.body)
		.then((contact) => res.json(contact))
		.catch((err) => console.log(err));
});

/**
 * @route DELETE /contacts/delete
 * @description deleted the contact if already present
 */

router.delete('/delete/:c_id', (req, res) => {
	Contact.findOneAndDelete({ _id: req.params.c_id })
		.then((contact) => res.json({ message: 'contact removed' }))
		.catch((err) => console.log(err));
	// console.log(req.params.c_id);
	// res.send('hmm');
});

module.exports = router;
