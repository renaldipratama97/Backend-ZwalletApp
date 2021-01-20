const { actionQuery } = require('../helpers/actionQuery')

const phonesModels = {
    getUsers: (limit, offset, order, username) => {
        if (!username){
            return actionQuery(`SELECT id, email, phoneNumber, gender, username, firstName, lastName, bornDate, address, photoProfile FROM users ORDER BY firstName ${order} LIMIT ${offset},${limit}`)
        } else {
            return actionQuery(`SELECT id, email, phoneNumber, gender, username, firstName, lastName, bornDate, address, photoProfile FROM users WHERE username LIKE ? ORDER BY firstName ${order} LIMIT ${offset},${limit}`, `%${username}%`)
        }
    },
    getUserById: (idUser) => {
        return actionQuery('SELECT * FROM user WHERE id = ?', idUser)
    },
    countAmountDataUsers: (table) => {
        return actionQuery(`SELECT COUNT(*) as totalData FROM ${table}`)
    },
    checkUsers: (email) => {
        return actionQuery('SELECT * FROM user WHERE email = ?', email)
    },
    insertUsers: (data) => {
        return actionQuery('INSERT INTO user SET ?', data)
    },
    deletePhone: (id) => {
        return actionQuery('DELETE FROM phone WHERE id = ?', id)
    },
    updateUser: (id, data) => {
        return actionQuery(`UPDATE user SET email = '${data.email}', phoneNumber = '${data.phoneNumber}', gender = '${data.gender}', username = '${data.username}', firstName = '${data.firstName}', lastName = '${data.lastName}', bornDate = '${data.bornDate}', address = '${data.address}', photoProfile = '${data.photoProfile}', updatedAt = '${data.updatedAt}' WHERE id = ?`, id)
    },
    searchRoleId: (userId) => {
        return actionQuery('SELECT roleId FROM user WHERE id = ? ', userId)
    }
}

module.exports = phonesModels