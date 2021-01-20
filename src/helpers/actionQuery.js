const connection = require('../configs/db')

exports.actionQuery = (...arg) => {
    return new Promise((resolve, reject) => {
        connection.query(...arg, (error, results) => {
            if(!error) {
                resolve(results)
            } else {
                reject(error)
            }
        })
    })
}