const phonesModels = require('../models/phones')
const { pagination } = require('../helpers/pagination')
const { response } = require('../helpers/response')
const createError = require('http-errors')

const phones = {
    getPhones: async (req, res, next) => {
        const { limit = 4, page = 1, order = "DESC" } = req.query
        const offset = (parseInt(page) - 1) * parseInt(limit)
        
        const setPagination = await pagination(limit, page, "phones", "phone")
        phonesModels.getAllPhones(limit, offset, order)
        .then(results => {
            const setResults = {
                pagination: setPagination,
                phones: results
            }
            response(res, setResults,{ status: 'succeed', statusCode: '200' }, null)
        })
        .catch(() => {
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    },
    getPhoneByIdUser: async (req, res, next) => {
        const idUser = req.params.idUser
        phonesModels.getPhoneByIdUser(idUser)
        .then(result => {
            const resultPhone = result
            response(res, resultPhone,{ status: 'succeed', statusCode: '200' }, null)
        })
        .catch((err) => {
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    },
    insertPhone: (req, res) => {
        const { id_user, phone_number } = req.body
        const data = {
            id_user,
            phone_number
        }
        phonesModels.insertPhone(data)
        .then(() => {
            response(res, {message: 'Phone has been created'}, { status: 'succeed', statusCode: '200' }, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    deletePhone: (req, res) => {
        const id = req.params.id
        if(!id){
            const error = new createError(400, 'Phone id cannot be empty')
            return next(error)
        }
        phonesModels.deletePhone(id)
        .then(() => {
            response(res, {message: 'Deleted Success'},{ status: 'succeed', statusCode: '200' }, null)
        })
        .catch((err) => {
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    }
}

module.exports = phones
