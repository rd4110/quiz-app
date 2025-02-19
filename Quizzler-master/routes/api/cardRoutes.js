const Card = require('../../models/Card');
const User = require('../../models/User');
const Deck = require('../../models/Deck');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

	// Route for creating new deck
	app.post('/api/deck', auth, (req, res) => {
		Deck.create({
			name: req.body.name,
			descr: req.body.descr,
			userID: req.user
			
		})
			.then((deck) => res.json(deck))
			.catch((err) => console.log(err));
	});

	// Route for creating new card
	app.post('/api/card/:deck', auth, (req, res) => {
		Card.create({
			keyWord: req.body.keyWord,
			definition: req.body.definition,
			deckID: req.params.deck,
		})
			.then((card) => res.json(card))
			.catch((err) => console.log(err));
	});

	// Route for finding all cards for a deck
	app.get('/api/cards/:deck', auth, (req, res) => {
		Card.find({
			deckID: req.params.deck,
		})
			.then((cards) => res.json(cards))
			.catch((err) => console.log(err));
	});

	// find all decks associated with logged in user
	// will use this in Useeffect on homepage to render decks
	app.get('/api/user/decks', auth, (req, res) => {
		Deck.find({
			userID: req.user,
		})
			.then((deck) => res.json(deck))
			.catch((err) => console.log(err));
	});

	// Routes for updating collection
	// Update a deck
	app.put('/api/deck/:deck', auth, (req, res) => {
		Deck.findOneAndUpdate({ _id: req.params.deck }, req.body, { new: true })
			.then((deck) => res.json(deck))
			.catch((err) => console.log(err));
	});

	// Update a card
	app.put('/api/card/:card', auth, (req, res) => {
		Card.findOneAndUpdate({ _id: req.params.card }, req.body, { new: true })
			.then((card) => res.json(card))
			.catch((err) => console.log(err));
	});

	// Routes for deleting a collection
	// Delete a deck
	app.delete('/api/deck/:deck', auth, (req, res) => {
		Deck.findOneAndDelete({ _id: req.params.deck })
			.then((deck) => res.json(deck))
			.catch((err) => console.log(err));
	});

	// Delete a card
	app.delete('/api/card/:card', auth, (req, res) => {
		Card.findOneAndDelete({ _id: req.params.card })
			.then((card) => res.json(card))
			.catch((err) => console.log(err));
	});

	// Delete all decks from user
	app.delete('/api/deck', auth, (req, res) => {
		Deck.deleteMany({ userID: req.user })
			.then(result => res.json(result))
			.catch(err => console.log(err))
	});

	// Delete all cards from deck
	app.delete('/api/cards/:deck', auth, (req, res) => {
		Card.deleteMany({ deckID: req.params.deck })
			.then(result => res.json(result))
			.catch(err => console.log(err))
	});
	
};
