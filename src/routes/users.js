const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, deleteUsers, updatefirstname, updatelastname, updatepicture, updatephonenumber } = require('../controllers/users')
const multer = require('multer')
const { uploadMulter } = require('../middleware/upload')
const authenticationToken = require('../helpers/authenticationToken')
// const authorizationUser = require('../helpers/authorizationUser')

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
.get('/', authenticationToken, getAllUsers)
.get('/:idUser', authenticationToken, getUserById)
.delete('/:idUser', authenticationToken, deleteUsers)
.patch('/updatefirstname/:idUser', authenticationToken, updatefirstname)
.patch('/updatelastname/:idUser', authenticationToken, updatelastname)
.patch('/updatephonenumber/:idUser', authenticationToken, updatephonenumber)
.patch('/updatepicture/:idUser', authenticationToken, upload, updatepicture)
module.exports = router
