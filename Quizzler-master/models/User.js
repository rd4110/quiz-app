const mongoose = require('mongoose');
const Deck = require('./Deck');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 5 },
	displayName: { type: String }
});

module.exports = User = mongoose.model('User', UserSchema);
