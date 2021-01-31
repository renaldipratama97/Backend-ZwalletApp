require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { response } = require('./src/helpers/response')
const cors = require('cors')
const authRoute = require('./src/routes/auth')
const usersRoute = require('./src/routes/users')
const phoneRoute = require('./src/routes/phones')
const transferRoute = require('./src/routes/transfer')

// Using CORS
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))
// Grouping End-Point
app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/phones', phoneRoute)
app.use('/transfer', transferRoute)

app.use('/upload', express.static('./uploads'))

// Default Response Unknown End-Point
app.use('*', (req, res) => {
    res.json({
        err: 'Page Not found'
    })
})

// Error Handling
app.use((err, req, res, next) => {
    response(res, null, { status: err.status || 'Failed', statusCode: err.statusCode || 400 }, { message: err.message })
})

app.listen(process.env.PORT, () => console.log('Server running on port : '+ process.env.PORT))