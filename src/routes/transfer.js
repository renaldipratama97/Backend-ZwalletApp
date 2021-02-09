const express = require('express')
const router = express.Router()
const { getAllTransfers, getById, getTransferByIdUser, createTransfer, deleteTransfer, getByIdLogin } = require('../controllers/transfer')
const authenticationToken = require('../helpers/authenticationToken')

router
.get('/', authenticationToken, getAllTransfers)
.get('/:id', authenticationToken, getById)
.get('/getTransaction/:idUser', authenticationToken, getByIdLogin)
.get('/sender/:idUser', authenticationToken, getTransferByIdUser)
.post('/', authenticationToken, createTransfer)
.delete('/:id', authenticationToken, deleteTransfer)
module.exports = router
