const express = require('express');
const fs = require('fs')

const app = express()

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

app.get('/api/v1/tours', (req, res) => {
           res.status(200).json({
                      status: 'success',
                      result: tours.length,
                      data: {
                                 tours: tours
                      }
           })
})

const port = 3000
app.listen(port , () => {
           console.log(`App running on port ${port}...`);
});

