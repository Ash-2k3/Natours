const express = require('express')
const tourController = require('./../controllers/tourController')
const router = express.Router()

// Param Middleware
router.param('id', (req, res, next, val) => {
           console.log(`Tour id is ${val}`);
           next()
})

// Mounting Routes
router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour);
router.route('/:id').get(tourController.getTourById).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;