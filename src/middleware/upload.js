const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const unique = uuidv4()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, unique + '-' + file.originalname)
  }
})

const limit = {
  fileSize: 2000000
}

const fileFilter = function (req, file, callback) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    return callback(null, true)
  }

  req.res.status(400).send({
    status: 'Failed',
    message: 'Avatar must be an image'
  })
}

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
  limits: limit
})

module.exports = {
  uploadMulter: upload
}
