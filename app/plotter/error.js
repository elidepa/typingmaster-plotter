const d3 = require('d3')
const db = require('../database')

exports.histogram = (err, window, cb, options) => {
    let el = window.document.querySelector('#dataviz-container')
    let body = window.document.querySelector('body')

    db.getErrors(1500, (data) => {
        let margin = {
            top: 10,
            right: 30,
            bottom: 70,
            left: 40
        }
        let width = 850 - margin.left - margin.right
        let height = 436 - margin.top - margin.bottom

        let maxValue = 5

        data = data.filter((x) => { return x < maxValue })

        let n = data.length

        let x = d3.scaleLinear()
            .domain([0, maxValue])
            .range([0, width])

        let bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20))(data)

        let y = d3.scaleLinear()
            .domain([0, d3.max(bins, (d) => { return d.length })])
            .range([height, 0])

        let svg = d3.select(el)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top});`)

        let bar = svg.selectAll('.bar')
            .data(bins)
            .enter().append('g')
            .attr('class', 'bar')
            .attr('transform', (d) => { return `translate(${margin.left + x(d.x0)}, ${margin.top + y(d.length)})` })

        var percentFormat = d3.format(".1%")

        if (options && options.error != undefined) {
            let resBin = parseInt(options.error / (maxValue / bins.length))
            bar.filter((d, i) => i === resBin)
                .attr('class', 'bar selected')

            let pos = data.filter((x) => { return x <= options.error }).length

            svg.append('text')
                .attr('class', 'x label')
                .attr('text-anchor', 'middle')
                .attr('x', width/2)
                .attr('y', margin.top + height + 60)
                .text(`You made less errors than ${percentFormat(1 - (pos / n))} of other participants!`)
        }

        bar.append('rect')
            .attr('x', 1)
            .attr('width', x(bins[0].x1) - x(bins[0].x0) - 1)
            .attr('height', (d) => { return height - y(d.length) })

        bar.append('text')
            .attr('dy', '0.75em')
            .attr('y', 2)
            .attr('x', width / 24 / 2)
            .attr('text-anchor', 'middle')
            .attr('visibility', 'hidden')
            .text((d) => { return percentFormat(d.length / n) })

        var yAxis = d3.axisLeft()
            .scale(y.domain([0, d3.max(bins, (d) => d.length) / n]))
            .tickFormat(d3.format(".0%"))

        svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
            .call(d3.axisBottom(x))

        svg.append('g')
            .attr('class', 'axis axis--y')
            .attr('transform', `translate(${margin.left}, ${margin.top })`)
            .call(yAxis)

        svg.append('text')
            .attr('class', 'x label')
            .attr('text-anchor', 'middle')
            .attr('x', width/2)
            .attr('y', margin.top + height + 40)
            .text('Error Rate (%)')

        let svgrc = window.$('body').html()

        cb(svgrc)
    })
}