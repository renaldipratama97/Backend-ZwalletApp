const express = require('express')
const router = express.Router()
const phoneController = require('../controllers/phones')
const authenticationToken = require('../helpers/authenticationToken')

router
.get('/', authenticationToken, phoneController.getPhones)
.get('/getPhoneByIdUser/:idUser', authenticationToken, phoneController.getPhoneByIdUser)
.post('/', authenticationToken, phoneController.insertPhone)
.delete('/:id', authenticationToken, phoneController.deletePhone)
module.exports = router
