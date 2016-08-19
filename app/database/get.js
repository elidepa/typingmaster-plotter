
exports.wpm = (connectionPool, limit, cb) => {
    connectionPool.getConnection((err, connection) => {
        if (!err) {
            connection.query("select WPM as wpm from PARTICIPANTS where WPM is not null order by PARTICIPANT_ID desc limit " + limit + ";", (err, rows, fields) => {
                if(!err) {
                    cb(rows.map(((el) => { return el.wpm })))
                } else {
                    console.log("app/database/get.js wpm: could not fetch wpm from db\n", err)
                }
            })
        } else {
            console.log("app/database/get.js wpm: error getting connection\n", err)
        }
        connection.release()
    })
}

exports.errors = (connectionPool, limit, cb) => {
    connectionPool.getConnection((err, connection) => {
        if (!err) {
            connection.query("select ERROR_RATE as error from PARTICIPANTS where ERROR_RATE is not null order by PARTICIPANT_ID desc limit " + limit + ";", (err, rows, fields) => {
                if(!err) {
                    cb(rows.map((el) => { return el.error }))
                } else {
                    console.log("app/database/get.js errors: could not fetch error rates from db\n", err)
                }
            })
        } else {
            console.log("app/database/get.js errors: error getting connection\n", err)
        }
        connection.release()
    })
}