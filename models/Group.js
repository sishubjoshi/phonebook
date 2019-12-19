const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const groupSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	members: {
		type: [ String ]
	}
});

module.exports = Grooup = mongoose.model('groups', groupSchema);
