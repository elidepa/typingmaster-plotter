const plotter = require('./plotter')

module.exports = (app) => {
    app.get('/test', (req, res) => {
        plotter.test((plot) => {
            res.send(plot)
        })
    })

    app.get('/wpm', (req, res) => {
        plotter.wpm((plot) => {
            res.send(plot)
        })
    })

    app.get(('/wpm/:wpm'), (req, res) => {
        plotter.wpm((plot) => {
            res.send(plot)
        }, parseInt(req.params.wpm))
    })

    app.get(('/error'), (req, res) => {
        plotter.error((plot) => {
            res.send(plot)
        })
    })

    app.get(('/error/:error'), (req, res) => {
        var errorPercent = "0." + req.params.error
        plotter.error((plot) => {
            res.send(plot)
        }, parseFloat(errorPercent) * 100)
    })
}
