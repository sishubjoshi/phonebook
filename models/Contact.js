const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ContactSchema = new Schema({
	number: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	nickname: {
		type: String
	}
	// date: {
	// 	type: String,
	// 	default: Date.now
	// }
});

module.exports = Contact = mongoose.model('contacts', ContactSchema);
