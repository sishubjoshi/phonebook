const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateContact(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.number = !isEmpty(data.number) ? data.number : '';

	// Email
	if (validator.isEmpty(data.name)) {
		errors.name = 'name is required';
	}

	if (validator.isEmpty(data.number)) {
		errors.number = 'number is required';
	}

	if (!validator.isLength(data.number, 10)) {
		errors.number = 'number must be 10 digits';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
