const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateGroup(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.members = !isEmpty(data.number) ? data.number : '';

	// Email
	if (validator.isEmpty(data.name)) {
		errors.name = 'name is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
