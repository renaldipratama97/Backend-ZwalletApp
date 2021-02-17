const { actionQuery } = require('../helpers/actionQuery')

const transfersModel = {
    getTransfers: (limit, offset, order) => {
        return actionQuery(`SELECT id, sender_id, receiver_id, amount, notes, date_time FROM transfer ORDER BY id ${order} LIMIT ${offset},${limit}`)
    },
    getTransferById: (id) => {
        return actionQuery('SELECT * FROM transfer WHERE id = ?', id)
    },
    getTransaction: (idUser) => {
        return actionQuery('SELECT transfer.id as idTransfer, transfer.sender_id, transfer.receiver_id, transfer.amount, transfer.notes, user.picture, user.firstname FROM transfer INNER JOIN user ON transfer.receiver_id = user.id WHERE transfer.sender_id = ? ORDER BY transfer.id DESC', idUser)
    },
    getDetailTransaction: (id) => {
        return actionQuery('SELECT transfer.id as idTransfer, transfer.sender_id, transfer.receiver_id, transfer.amount, transfer.notes, user.picture, user.firstname, user.lastname, user.phonenumber, transfer.date_time FROM transfer INNER JOIN user ON transfer.receiver_id = user.id WHERE transfer.id = ?', id)
    },
    getTransferByIdUser: (idUser) => {
        return actionQuery('SELECT * FROM transfer WHERE sender_id = ?', idUser)
    },
    insertTransfer: (data) => {
        return actionQuery('INSERT INTO transfer SET ?', data)
    },
    updateSenderAfterInsert: (amount, sender_id) => {
        return actionQuery('UPDATE user SET balance = balance - ? WHERE id = ?', [amount, sender_id])
    },
    updateReceiverAfterInsert: (amount, receiver_id) => {
        return actionQuery('UPDATE user SET balance = balance + ? WHERE id = ?', [amount, receiver_id])
    },
    deleteTransfer: (id) => {
        return actionQuery('DELETE FROM transfer WHERE id = ?', id)
    }
}

module.exports = transfersModel