
exports.wpm = (connection, cb) => {
    connection.query("select WPM as wpm from PARTICIPANTS where WPM is not null", (err, rows, fields) => {
        if(!err) {
            cb(rows.map(((el) => { return el.wpm })))
        } else {
            console.log("Voi ny perse, t. database.get.wpm ", err)
        }
    })
}