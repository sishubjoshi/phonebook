const express = require('express');
const router = express.Router();
const validateGroup = require('../validation/group');
// model
const Group = require('../models/Group');

router.get('/get', (req, res) => {
	Group.find().then((data) => res.send(data));
});
router.post('/add', (req, res) => {
	// console.log(req.body);

	const { errors, isValid } = validateGroup(req.body);
	if (!isValid) {
		return res.send(errors);
	}
	Group.findOne({ name: req.body.name }).then((data) => {
		if (data) {
			res.send({ message: 'group already present by the name' });
		} else {
			const group = new Group({
				name: req.body.name,
				members: req.body.members
			});
			group.save().then((data) => res.send(data)).catch((err) => console.log(err));
		}
	});
});

module.exports = router;
