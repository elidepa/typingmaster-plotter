
module.exports = {
    test: (connection) => {
        connection.query("SELECT 1 + 1 as solution", (err, rows, fields) => {
            if (!err) {
                console.log('The solution to 1 + 1 is ', rows[0].solution)
            } else {
                throw err
            }
        })
    }
}