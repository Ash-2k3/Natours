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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Application logic is the logic which makes application run, concerned about managing req and responses, bridge between model and view layers

// Business logic is the logic that actually solves the problem, directly related to business rules, how the business works and business needs.