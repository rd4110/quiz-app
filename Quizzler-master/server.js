const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// Connect to the Mongo DB
mongoose
	.connect(process.env.DB_URI || 'mongodb://localhost/quizzler', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		createIndexes: true,
	})
	.then(() => console.log('connected to db...'))
	.catch((err) => console.log(err));
//==============================================
require('./models/User');
require('./models/Deck');
require('./models/Card');

// // routes here
require('./routes/api/users')(app);
require('./routes/api/cardRoutes')(app);

// route to compile all jsx into REACT html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// listening here
app.listen(PORT, () => {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
