const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, deleteUsers, updatefirstname, updatelastname, updatepicture } = require('../controllers/users')
const multer = require('multer')
const { uploadMulter } = require('../middleware/upload')
// const { verifyAccess } = require('../middlewares/auth')

const upload = (req, res, next) => {
    const handleUpload = uploadMulter.single('picture')
    handleUpload(req, res, error => {
      if (error instanceof multer.MulterError) {
        return res.status(400).send({
          status: 'Failed',
          message: error.message
        })
      }
  
      if (error) {
        return res.status(500).send({
          status: 'Failed',
          message: 'Internal server error'
        })
      }
      next()
    })
  }

router
.get('/', getAllUsers)
.get('/:idUser', getUserById)
.delete('/:idUser', deleteUsers)
.patch('/updatefirstname/:idUser', updatefirstname)
.patch('/updatelastname/:idUser', updatelastname)
.patch('/updatepicture/:idUser', upload, updatepicture)
module.exports = router
