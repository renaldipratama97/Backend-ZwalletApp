const express = require('express')
const router = express.Router()
const { loginUser, registerUser } = require('../controllers/users')

router
.post('/login', loginUser)
.post('/register', registerUser)
module.exports = router
