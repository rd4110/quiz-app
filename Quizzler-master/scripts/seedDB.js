const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(
    process.env.MONGODB_URI ||
    'mongodb://localhost/quizzler'
  );

  const userSeed = [
      {
          _id: 1,
          email:'Bugs.Bunny@gmail.com',
          password: 'password'  
      },
      {
          _id: 2,
          email:'Daffy.Duck@gmail.com',
          password: 'password'
      }
];

const deckSeed = [
      {
      _id:1,
      name:'Capitols',
      descr:'Learn the state capitals',
      userID:1
       
      },
      {
        _id: 2,
        name:'Heros',
        descr:'Identify a heros real name from their alterego',
        userID:1
      },
      {
        _id: 3,
        name:'Periodic Table',
        descr:'From the symbol name the element',
        userID:2         
        },
      {
          _id: 4,
          name:'Mongoose JS',
          descr:'From the keyword come up with the definition of a Mongoose element',
          userID:2                    
      }
];

const cardSeed = [
  {
    deckID:4,
    keyWord:'Collections',
    definition:'Collections in Mongo are equivalent to tables in relational databses. They can hold multiple JSON documents'
  },
  {
    deckID:4,
    keyWord:'Documents',
    definition:'Documents are equivalent to records or rows of data in SQL. While a SQL row can reference data in other tables, Mongo documents usually combine that in a document'
  },
  {
    deckID:4,
    keyWord:'Fields',
    definition:'Fields or attributes are similar to columns in a SQL table.'
  },
  {
    deckID:4,
    keyWord:'Schema',
    definition:'While Mongo is schema-less, SQL defines a schema via the table definition.  A mongoose schema is a document data structure (or shape of the document) that is enforced via the application layer.'
  },
  {
    deckID:4,
    keyWord:'Models',
    definition:'Models are higher-order constructors that hake a schema and create an instance of a document equivalent to records in a relational databse.'
  },
  {
    deckID:1,
    keyWord:'Tennessee',
    definition:'Nashville'
  },
  {
    deckID:1,
    keyWord:'Mississippi',
    definition:'Jackson'
  },
  {
    deckID:1,
    keyWord:'Alabama',
    definition:'Montgomery'
  },
  {
    deckID:1,
    keyWord:'Alaska',
    definition:'Juneau'
  },
  {
    deckID:1,
    keyWord:'Arizona',
    definition:'Phoenix'
  },
  {
    deckID:2,
    keyWord:'Hawkeye',
    definition:'Clint Barton'
  },
  {
    deckID:2,
    keyWord:'Green Lantern',
    definition:'Hal Jordan'
  },
  {
    deckID:2,
    keyWord:'Black Panter',
    definition:'King T`Challa'
  },
  {
    deckID:2,
    keyWord:'Captain America',
    definition:'Steve Rogers'
  },
  {
    deckID:2,
    keyWord:'The Flash',
    definition:'Barry Allen'
  },
  {
    deckID:2,
    keyWord:'Daredevil',
    definition:'Matt Murdock'
  },
  {
    deckID:2,
    keyWord:'Iron Man',
    definition:'Tony Stark'
  },
  {
    deckID:3,
    keyWord:'H',
    definition:'Hydrogen'
  },
  {
    deckID:3,
    keyWord:'He',
    definition:'Helium'
  },
  {
    deckID:3,
    keyWord:'Li',
    definition:'Lithium'
  },
  {
    deckID:3,
    keyWord:'Be',
    definition:'Beryllium'
  },
  {
    deckID:3,
    keyWord:'B',
    definition:'Boron'
  }

];

  db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.Card
  .remove({})
  .then(() => db.Card.collection.insertMany(cardSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.Deck
  .remove({})
  .then(() => db.Deck.collection.insertMany(deckSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });