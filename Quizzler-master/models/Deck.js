const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	descr: {
		type: String,
		required: true,
	},
	userID: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = Deck = mongoose.model('Deck', DeckSchema);
