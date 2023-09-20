const express = require('express');
const fs = require('fs')
const morgan = require('morgan')

const app = express()

app.use(express.json()) //middleware in between req and res.

app.use((req, res, next) => {
           console.log('Hello fromm the middleware💀 ');
           next();
}) // Default applies to each and every URL 

app.use((req, res, next) => {
           req.requestTime = new Date().toISOString();
           next();
})

app.use(morgan('dev'));

// Good practise to mention version of api: v1/v2 etc
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
           res.status(200).json({
                      status: 'success',
                      requestAt: req.requestTime,
                      result: tours.length,
                      data: {
                                 tours: tours
                      }
           })
}

const createTour = (req, res) => {
           // console.log(req.body) // cuz of middleware body is accessible

           const newId = tours[tours.length - 1].id + 1;
           const newTour = Object.assign({id: newId}, req.body);

           tours.push(newTour);
           fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
                      res.status(201).json({
                                 status: 'success',
                                 data: {
                                          tour: newTour  
                                 }
                      })
           })

           // res.send('Done') // to end the res cycle
}

const getTourById = (req, res) => {  // ? for optional 
           // console.log(req.body) // cuz of middleware body is accessible
           console.log(req.params)
           
           const id = req.params.id * 1
           if (id > tours.length) {
                      return res.status(404).json({
                                 status: 'fail',
                                 message: 'Invalid Id'
                      })
           }
           
           const tour = tours.find(el => el.id === id)
           res.status(200).json({
                      status: 'success',
                      data: {
                                 tour
                      }
           })
}

const updateTour = (req, res) => {
           const id = req.params.id * 1
           if (id > tours.length) {
                      return res.status(404).json({
                                 status: 'fail',
                                 message: 'Invalid Id'
                      })
           }
           res.status(200).json({
                      status: 'success',
                      data: {
                                 tour:'<Updated tour here>'
                      }
           })
}

const deleteTour = (req, res) => {
           const id = req.params.id * 1
           if (id > tours.length) {
                      return res.status(404).json({
                                 status: 'fail',
                                 message: 'Invalid Id'
                      })
           }
           res.status(204).json({
                      status: 'success',
                      data: null
           })
}

const getAllUsers = (req, res) => {
           res.status(500).json({
                      status: 'error',
                      message: 'This route is not yet defined'
           })
}

const getUser = (req, res) => {
           res.status(500).json({
                      status: 'error',
                      message: 'This route is not yet defined'
           })
}

const createUser = (req, res) => {
           res.status(500).json({
                      status: 'error',
                      message: 'This route is not yet defined'
           })
}

const updateUser = (req, res) => {
           res.status(500).json({
                      status: 'error',
                      message: 'This route is not yet defined'
           })
}

const deleteUser = (req, res) => {
           res.status(500).json({
                      status: 'error',
                      message: 'This route is not yet defined'
           })
}

const tourRouter = express.Router()
const userRouter = express.Router()

app.use('/api/v1/tours', tourRouter) //Sub app
app.use('/api/v1/users',userRouter); // This concept is called mounting routers

tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour)

 
app.route('/api/v1/users').get(getAllUsers).post(createUser)
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser)
const port = 3000
app.listen(port , () => {
           console.log(`App running on port ${port}...`);
});