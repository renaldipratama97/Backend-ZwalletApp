const express = require('express')
const router = express.Router()
const { getAllTransfers, getById, getTransferByIdUser, createTransfer, deleteTransfer } = require('../controllers/transfer')
// const { verifyAccess } = require('../middlewares/auth')

router
.get('/', getAllTransfers)
.get('/:id', getById)
.get('/sender/:idUser', getTransferByIdUser)
.post('/', createTransfer)
.delete('/:id', deleteTransfer)
module.exports = router
