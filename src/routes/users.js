const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, deleteUsers } = require('../controllers/users')
const { uploadMulter } = require('../middleware/upload')
// const { verifyAccess } = require('../middlewares/auth')

router
.get('/', getAllUsers)
.get('/:idUser', getUserById)
.delete('/:idUser', deleteUsers)
module.exports = router
