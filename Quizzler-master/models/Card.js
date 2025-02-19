const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	
    keyWord: { type: String, required: true },
    definition: { type: String, required: true },
    deckID: { type: Schema.Types.ObjectId, ref: 'Deck' }
});

module.exports = Card = mongoose.model('Card', CardSchema);