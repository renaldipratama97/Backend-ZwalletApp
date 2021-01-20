const express = require('express')
const router = express.Router()
const { loginUser, registerUser, updatePhotoProfile} = require('../controller/users')
const { uploadMulter } = require('../middlewares/upload')
const { verifyAccess } = require('../middlewares/auth')

router
.post('/login', loginUser)
.post('/register', registerUser)
.put('/update/:id', verifyAccess, uploadMulter.single('picture'), updatePhotoProfile)
module.exports = router
