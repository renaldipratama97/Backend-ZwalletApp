const { actionQuery } = require('../helpers/actionQuery')

const phonesModels = {
    getAllPhones: (limit, offset, order) => {
        return actionQuery(`SELECT id, id_user, phone_number FROM phone ORDER BY id ${order} LIMIT ${offset},${limit}`)
    },
    getPhoneByIdUser: (idUser) => {
        return actionQuery('SELECT * FROM phone WHERE id_user = ?', idUser)
    },
    insertPhone: (data) => {
        return actionQuery('INSERT INTO phone SET ?', data)
    },
    deletePhone: (id) => {
        return actionQuery('DELETE FROM phone WHERE id = ?', id)
    }
}

module.exports = phonesModels