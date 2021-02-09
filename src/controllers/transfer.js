const createError = require('http-errors')
const tranferModels = require('../models/transfer')
const { pagination } = require('../helpers/pagination')
const { response } = require('../helpers/response')

const transferController =  {
    getAllTransfers: async (req, res, next) => {
        const { limit = 4, page = 1, order = "DESC" } = req.query
        const offset = (parseInt(page) - 1) * parseInt(limit)
        
        const setPagination = await pagination(limit, page, "transfers", "transfer")
        tranferModels.getTransfers(limit, offset, order)
        .then(results => {
            console.log('Hello')
            const setResults = {
                pagination: setPagination,
                transfers: results
            }
            response(res, setResults,{ status: 'succeed', statusCode: '200' }, null)
        })
        .catch(() => {
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    },
    getById: (req, res, next) => {
        const { id } = req.params
        if(!id){
            const error = new createError(400, 'Id cannot be empty')
            return next(error)
        }
        tranferModels.getTransferById(id)
        .then(results => {
            if(results.length < 1){
                const error = new createError(400, 'Id cannot be empty')
                return next(error)
            }
            response(res, results[0], { status: 'succeed', statusCode: 200 }, null)
        })
        .catch(() => {
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    },
    getByIdLogin: (req, res, next) => {
        const idUser = req.params.idUser
        if(!idUser){
            const error = new createError(400, 'Id cannot be empty')
            return next(error)
        }
        tranferModels.getTransaction(idUser)
        .then(results => {
            response(res, results, { status: 'succeed', statusCode: 200 }, null)
        })
        .catch((err) => {
            console.log(err)
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    },
    getTransferByIdUser: async (req, res, next) => {
        const { idUser } = req.params
        if(!idUser){
            const error = new createError(400, 'IdUser cannot be empty')
            return next(error)
        }
        tranferModels.getTransferByIdUser(idUser)
        .then(results => {
            if(results.length < 1){
                const error = new createError(400, 'IdUser cannot be empty')
                return next(error)
            }
            response(res, results[0], { status: 'succeed', statusCode: 200 }, null)
        })
        .catch(() => {
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    },
    createTransfer: async (req, res, next) => {
        const { sender_id, receiver_id, amount, notes } = req.body
    
        const data = {
            sender_id,
            receiver_id,
            amount,
            date_time: new Date(),
            notes
        }
        tranferModels.insertTransfer(data)
        tranferModels.updateSenderAfterInsert(amount, sender_id)
        tranferModels.updateReceiverAfterInsert(amount, receiver_id)
        .then(result => {
            const resultPhone = result
            response(res, {message: 'Transfer Success'} , { status: 'succeed', statusCode: 200 }, null)
        })
        .catch((err) => {
            console.log(err)
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    },
    deleteTransfer: (req, res, next) => {
        const id = req.params.id
        tranferModels.deleteTransfer(id)
        .then(() => {
            response(res, {message: 'Delete Success'} , { status: 'succeed', statusCode: 200 }, null)
        })
        .catch((err) => {
            console.log(err)
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    }
}

module.exports = transferController