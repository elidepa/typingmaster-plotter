const mysql = require('mysql')
const dbConfig = require('../../config/database')

const test = require('./test.js')
const get = require('./get.js')

const connection = mysql.createConnection(dbConfig.connectionSettings)

exports.test = () => {
    test.test(connection)
}

exports.getWpm = (cb) => {
    get.wpm(connection, cb)
}

exports.closeConnection = (cb) => {
    console.log("Closing db connection...")
    connection.end({}, (err) => {
        if (err) {
            console.log("Error in closing the db connection ", err)
            cb()
        } else  {
            console.log("Closed db connection")
            cb()
        }
    })

}