const express = require('express');
const fs = require('fs')

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

// app.get('/', (req, res) => {
//            res.status(200).json(
//                       {message: 'Hello from the server side!',
//            app: 'Notours'})
// })

// app.post('/', (req, res) => {
//            res.send('You can post to this endpoint..')
// })

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

app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTourById).patch(updateTour).delete(deleteTour)


const port = 3000
app.listen(port , () => {
           console.log(`App running on port ${port}...`);
});

