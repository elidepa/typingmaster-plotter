
const express = require('express')
const app = express()
const port = 3000

const db = require('./app/database')

require('./app/routes')(app)

app.use(express.static('public'))

var server = app.listen(port, function (err) {
    if (err) {
        return console.log(":(", err)
    }
})

var gracefulShutdown = () => {
    console.log("Shutting down server")
    db.closeConnection(() => {
        server.close(() => {
            console.log("Closed all network connections")
            process.exit()
        })

        setTimeout(() => {
            console.log("Could not close connections, forcing the process to stop")
            process.exit()
        }, 10000)
    })

    setTimeout(() => {
        console.log("Could not close connections, forcing the process to stop")
        process.exit()
    }, 100000)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
