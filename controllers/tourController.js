const fs = require('fs')
const { nextTick } = require('process')
const Tour = require('./../models/tourModel')

exports.getAllTours =  async (req, res) => {
           try {
                      console.log(req.query);
                      const tours = await Tour.find()
                      .where('duration')
                      .equals(5)
                      .where('difficulty')
                      .equals('easy')
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
           try {      
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

exports.deleteTour = async (req, res) => {
           try {
                      const tour = await Tour.findByIdAndDelete(req.params.id);
                      res.status(204).json({
                      status: 'success',
                      data: null
                      })
           } catch (err) {
                      res.status(404).json({
                                                       status: 'fail',
                                                       message: err
                                            })
           }
           const id = req.params.id * 1
           // if (id > tours.length) {
           //            
           // }
           
}