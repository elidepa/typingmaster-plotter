const d3 = require('d3')

exports.test = (err, window, cb) => {
    let el = window.document.querySelector('#dataviz-container')
    let body = window.document.querySelector('body')

    d3.select(el)
        .append('svg:svg')
        .attr('width', 600)
        .attr('height', 300)
        .append('circle')
        .attr('cx', 300)
        .attr('cy', 150)
        .attr('r', 30)
        .attr('fill', '#26963c')

    let svgrc = window.$("body").html()
    cb(svgrc)
}