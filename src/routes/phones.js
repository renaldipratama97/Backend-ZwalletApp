const express = require('express')
const router = express.Router()
const phoneController = require('../controller/phones')
const { cacheAllProducts} = require('../middlewares/redis')
const { verifyAccess } = require('../middlewares/auth')

router
.get('/', cacheAllProducts, phoneController.getPhones)
.get('/:userId', phoneController.detailPhones)
.post('/', phoneController.insertPhone)
.put('/:id', phoneController.updatePhone)
.delete('/:id', phoneController.deletePhone)
module.exports = router
