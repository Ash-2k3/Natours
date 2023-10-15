const fs = require('fs')
const { nextTick } = require('process')
const Tour = require('./../models/tourModel')

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

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

exports.createTour = (req, res) => {
           // console.log(req.body) // cuz of middleware body is accessible

           // const newId = tours[tours.length - 1].id + 1;
           // const newTour = Object.assign({id: newId}, req.body);

           // tours.push(newTour);
           // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
           //            res.status(201).json({
           //                       status: 'success',
           //                       data: {
           //                                tour: newTour  
           //                       }
           //            })
           // })

           // res.send('Done') // to end the res cycle
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

exports.checkBody = (req, res, next) => {
           if(!req.body.name || !req.body.price) {
                      return res.status(400).json({
                                 status: 'fail',
                                 message: 'Missing name or price'
                      });
           }
           next();
}