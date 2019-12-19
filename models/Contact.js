const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ContactSchema = new Schema({
	number: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
		unique: true
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
