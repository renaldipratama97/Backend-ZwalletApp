const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, updatePhotoProfile, deleteUsers } = require('../controller/users')
const { uploadMulter } = require('../middlewares/upload')
// const { verifyAccess } = require('../middlewares/auth')

router
.get('/', getAllUsers)
.get('/idUser', getUserById)
.patch('/:idUser', uploadMulter.single('picture'), updatePhotoProfile)
.delete('/:idUser', deleteUsers)
module.exports = router
