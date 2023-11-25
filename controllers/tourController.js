const fs = require('fs')
const { nextTick } = require('process')
const Tour = require('./../models/tourModel')

exports.getAllTours =  async (req, res) => {
           try {
                      const tours = await Tour.find() // All docs if no args passed
           res.status(200).json({
                      status: 'success',
                      requestAt: req.requestTime,
                      result: tours.length,
                      data: {
                                 tours: tours
                      }
           })
           } catch (err) {
                      res.status(404).json({
                                 status: 'fail',
                                 message: err
                      })
           }
           
}

exports.createTour = async (req, res) => {
           try {
           const newTour = await Tour.create(req.body);

           res.status(201).json({
                      status: 'success',
                      data: {
                                 tour: newTour
                      }
           });
} catch(err) {
           res.status(400).json({
                      status: 'fail',
                      message: err
           })
}
}

exports.getTourById = async (req, res) => {  // ? for optional 
           try {
                      const tour = await Tour.findById(req.params.id);
                      res.status(200).json({
                                 status: 'success',
                                 data: {
                                            tour
                                 }
                      })
           } catch (err) {
                      res.status(404).json({
                                 status: 'fail',
                                 message: err
                      })
           }
}

exports.updateTour = async (req, res) => {
           console.log('Update method is being called');
           try {      
                      console.log(req.body)
                      const tour = await Tour.findByIdAndUpdate(
                                 req.params.id,
                                 req.body, {
                                            new: true // We want to return the new document to the client
                                 })
                      res.status(200).json({
                      status: 'success',
                      data: {
                                 tour
                      }
           })
           } catch (err) {
                      res.status(404).json({
                                 status: 'fail',
                                 message: 'Invalid Id'
                      })
           }
}

exports.deleteTour = (req, res) => {
           const id = req.params.id * 1
           // if (id > tours.length) {
           //            return res.status(404).json({
           //                       status: 'fail',
           //                       message: 'Invalid Id'
           //            })
           // }
           // res.status(204).json({
           //            status: 'success',
           //            data: null
           // })
}