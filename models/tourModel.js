const mongoose = require('mongoose'); // Mongoose is a abstraction layer over (ODM) mongodb.

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

module.exports = Tour