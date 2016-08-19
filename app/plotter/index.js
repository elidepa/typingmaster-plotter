const jsdom = require('jsdom')
const fs = require('fs')
const jquery = fs.readFileSync(__dirname + "/../../public/vendor/jquery-3.1.0.js")

const test = require('./test.js')
const wpmPlotter = require('./wpm.js')

let plot = (done, cb, options) => {
    let htmlTemplate = "<body><div id='dataviz-container'></div></body>"

    jsdom.env({
        features: {
            QuerySelector: true
        },
        html: htmlTemplate,
        src: [jquery],
        done: (err, window) => {
            done(err, window, cb, options)
        }
    })
}

exports.test = (cb) => {
    plot(test.test, cb)
}

exports.wpm = (cb, wpm) => {
    if (wpm) {
        plot(wpmPlotter.histogram, cb, {wpm: wpm})
    } else {
        plot(wpmPlotter.histogram, cb)
    }
}
