const mongoose = require('mongoose'); // Mongoose is a abstraction layer over (ODM) mongodb.

const tourSchema = new mongoose.Schema({ // Specify the datatypes and validation for our model.
           name: {
             type: String,
             required: true,
             unique: true
           },
           duration: {
            type: Number,
            required: [true, 'A tour must have a duration']
           },
           maxGroupSize: {
            type: Number,
            require: [true, 'A tour must have a group size']
           },
           difficulty: {
             type: String,
             required: [true, 'A tour must have a difficulty']
           },
           ratingsAverage: {
             type: Number,
             default: 4.5
           },
           ratingsQuantity: {
             type: Number,
             default: 0
           },
           price: {
             type: Number,
             required: [true, 'A tour must have a price']
           },
           priceDiscount: Number,
           summary: {
             type: String,
             trim: true, // Only works for string property (Removes white space from the string)
            required: true
            },
           description: {
             type: String,
             trim: true
           },
           imageCover: {
             type: String,
             required: [true, 'A tour must have a cover image']
           },
           images: [String],
           createdAt: {
             type: Date,
             default: Date.now() // Timestamp
           },
           startDate: [Date]
         });

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour