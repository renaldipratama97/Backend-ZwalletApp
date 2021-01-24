const { actionQuery } = require('../helpers/actionQuery')

const usersModels = {
    getUsers: (limit, offset, order, username) => {
        if (!username){
            return actionQuery(`SELECT id, firstname, lastname, username, email, pin, phonenumber, balance, picture, roleId, activation FROM user ORDER BY firstName ${order} LIMIT ${offset},${limit}`)
        } else {
            return actionQuery(`SELECT id, firstname, lastname, username, email, pin, phonenumber, balance, picture, roleId, activation FROM user WHERE username LIKE ? ORDER BY firstName ${order} LIMIT ${offset},${limit}`, `%${username}%`)
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
    deleteUser: (idUser) => {
        return actionQuery('DELETE FROM user WHERE id = ?', idUser)
    },
    updateUser: (id, data) => {
        return actionQuery(`UPDATE user SET email = '${data.email}', phoneNumber = '${data.phoneNumber}', gender = '${data.gender}', username = '${data.username}', firstName = '${data.firstName}', lastName = '${data.lastName}', bornDate = '${data.bornDate}', address = '${data.address}', photoProfile = '${data.photoProfile}', updatedAt = '${data.updatedAt}' WHERE id = ?`, id)
    },
    searchRoleId: (userId) => {
        return actionQuery('SELECT roleId FROM user WHERE id = ? ', userId)
    }
}

module.exports = usersModels