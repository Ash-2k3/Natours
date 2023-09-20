const express = require('express');
const morgan = require('morgan')
const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')

const app = express()
app.use(express.json()) //middleware in between req and res.
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
           console.log('Hello fromm the middleware💀 ');
           next();
}) // Default applies to each and every URL 

app.use((req, res, next) => {
           req.requestTime = new Date().toISOString();
           next();
})

app.use(morgan('dev'));

// Middlewares
app.use('/api/v1/tours', tourRouter) //Sub app
app.use('/api/v1/users',userRouter); // This concept is called mounting routers

module.exports = app;