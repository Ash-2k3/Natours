/**
 * Code for application setup, In server.js we mostly tend
 * to have the code related to the setup of application, for
 * e.g connecting database, starting express code.
 */

const mongoose = require('mongoose'); // Mongoose is a abstraction layer over (ODM) mongodb.
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {   // Connecting the application to the hosted DB
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log(con.connections);
  console.log('CONNECTION ESTABLISHED WITH MONGOOSE')
});

// Model: Blueprint of documents. To perform CRUD we need models, for models we need schema we need schema to describe data. default value etc

const tourSchema = new mongoose.Schema({ // Specify the datatypes and validation for our model.
  name: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({ // Document instance
  name: 'The Forest Hiking',
  rating: 4.7,
  price: 497
})

testTour.save() // Save the database instance in database, returns a promise

testTour.save().then(doc => {
  console.log(doc);
}).catch(err => {
  console.log('Errororororororororororo', err)
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
