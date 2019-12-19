const express = require('express');
const router = express.Router();
const validateContact = require('../validation/contact');
const isEmpty = require('../validation/isEmpty');
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
	const { errors, isValid } = validateContact(req.body);

	if (!isValid) {
		return res.send(errors);
	}
	Contact.findOne({ name: req.body.name }).then((contact) => {
		// console.log('eeeeeeeeeee');
		if (contact) {
			return res.send('name already exists');
		} else {
			Contact.findOne({ number: req.body.number }).then((cc) => {
				if (cc) {
					return res.send('number already exists');
				}
				const newContact = new Contact({
					number: req.body.number,
					name: req.body.name
				});
				newContact.save().then((contact) => res.json(contact)).catch((err) => console.log(err));
			});
		}
	});

	// res.send(req.body);
});

/**
 * @route UPDATE /contacts/update
 * @description Updates contact
 */
router.put('/update/:c_id', (req, res) => {
	const { errors, isValid } = validateContact(req.body);
	console.log(errors);
	if (!isValid) {
		return res.send(errors);
	}
	Contact.findOne({ name: req.body.name }).then((contact) => {
		if (contact && contact._id != req.params.c_id) {
			console.log(contact._id, 'hmmmmmmmm', req.params.c_id, contact._id !== req.params.c_id);
			errors.name = 'same name is already present';
			return res.send(errors);
			// return res.send({ message: 'name is already present' });
		}
		Contact.findOne({ number: req.body.number }).then((contact) => {
			if (contact && contact._id != req.params.c_id) {
				errors.number = 'number is associated with another contact';
				return res.send(errors);
			}
		});
		// console.log(contact._id == req.params.c_id);
	});

	// console.log(errors.name);
	if (isEmpty(errors)) {
		Contact.findOneAndUpdate({ _id: req.params.c_id }, req.body)
			.then((contact) => res.json(contact))
			.catch((err) => console.log(err));
	} else {
		return res.send(errors);
	}
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
