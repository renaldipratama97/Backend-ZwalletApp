// const { throws } = require('assert')
const phonesModels = require('../models/phones')
const response = require('../helpers/response')
const phones = {
    getPhones: async (req, res, next) => {
        const { limit = 4, page = 1, order = "DESC" } = req.query
        const offset = (parseInt(page) - 1) * parseInt(limit)
        
        const setPagination = await pagination(limit, page, "phone", "phone")
        usersModels.getUsers(limit, offset, order)
        .then(results => {
            const setResults = {
                pagination: setPagination,
                users: results
            }
            response(res, setResults,{ status: 'succeed', statusCode: '200' }, null)
        })
        .catch(() => {
            console.log(err)
        })
    },
    detailPhones: (req, res) => {
        const userId = req.params.userId
        modelPhones.getPhoneById(userId)
        .then(result => {
            const resultPhone = result
            helper.response(res, resultPhone, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    insertPhone: (req, res) => {
        const { id_user, phone_number } = req.body
        const data = {
            id_user,
            phone_number
        }
        modelPhones.insertPhone(data)
        .then(result => {
            const resultPhone = result
            helper.response(res, resultPhone, 201, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    updatePhone: (req, res) => {
        const id = req.params.id
        const phone_number = req.body.phone_number || ''
        const dataUpdate = {
            phone_number
        }
        modelPhones.updatePhone(id, dataUpdate)
        .then(result => {
            const resultPhone = result
            helper.response(res, resultPhone, 201, null)
        })
        .catch(err => {
            console.log(err)
        })
    },
    deletePhone: (req, res) => {
        const id = req.params.id
        phonesModels.deletePhone(id)
        .then(result => {
            const resultPhone = result
            helper.response(res, resultPhone, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

module.exports = phones
