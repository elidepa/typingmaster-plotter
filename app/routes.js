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

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}
