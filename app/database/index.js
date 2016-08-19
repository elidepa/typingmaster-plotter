const mysql = require('mysql')
const dbConfig = require('../../config/database')

const test = require('./test.js')
const get = require('./get.js')

const connectionPool = mysql.createPool(dbConfig.connectionSettings)

exports.test = () => {
    test.test(connectionPool)
}

exports.getWpm = (limit, cb) => {
    get.wpm(connectionPool, limit, cb)
}

exports.getErrors = (limit, cb) => {
    get.errors(connectionPool, limit, cb)
}

exports.closeConnection = (cb) => {
    console.log("Closing db connections...")
    connectionPool.end((err) => {
        if (err) {
            console.log("Error in closing the db connection pool ", err)
            cb()
        } else  {
            console.log("Closed the db connection pool")
            cb()
        }
    })

}