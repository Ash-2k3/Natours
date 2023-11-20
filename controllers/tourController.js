const fs = require('fs')
const { nextTick } = require('process')
const Tour = require('./../models/tourModel')

exports.getAllTours = (req, res) => {
           res.status(200).json({
                      status: 'success',
                      requestAt: req.requestTime,
                      // result: tours.length,
                      // data: {
                      //            tours: tours
                      // }
           })
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

exports.getTourById = (req, res) => {  // ? for optional 
           // console.log(req.body) // cuz of middleware body is accessible
           console.log(req.params)
           
           // const id = req.params.id * 1
           // if (id > tours.length) {
           //            return res.status(404).json({
           //                       status: 'fail',
           //                       message: 'Invalid Id'
           //            })
           // }
           
           // const tour = tours.find(el => el.id === id)
           // res.status(200).json({
           //            status: 'success',
           //            data: {
           //                       tour
           //            }
           // })
}

exports.updateTour = (req, res) => {
           const id = req.params.id * 1
           // if (id > tours.length) {
           //            return res.status(404).json({
           //                       status: 'fail',
           //                       message: 'Invalid Id'
           //            })
           // }
           // res.status(200).json({
           //            status: 'success',
           //            data: {
           //                       tour:'<Updated tour here>'
           //            }
           // })
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