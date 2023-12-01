const fs = require('fs');
const mongoose = require('mongoose'); // Mongoose is a abstraction layer over (ODM) mongodb.
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {   // Connecting the application to the hosted DB
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log('CONNECTION ESTABLISHED WITH MONGOOSE')
});

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into DB
const importData = async() => {
           try {
                      await Tour.create(tours);
                      console.log('Data has been loaded!');
                      process.exit();
           } catch(err) {
                      console.log(err);
           }
}

// Delete all data from collection
const deleteData = async() => {
           try {
                      await Tour.deleteMany(); // Delete all the documents.
                      console.log('Data has been deleted!');
                      process.exit()
           } catch(err) {
                      console.log(err);
           }
}

if (process.argv[2] === '--import') {
           importData()
} else if (process.argv[2] === '--delete') {
           deleteData()
}

console.log(process.argv);
