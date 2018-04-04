const parse = require('csv-parse/lib/sync')
const fs = require('fs')

exports.loadWPM = () => {
  data = fs.readFileSync('app/data/data.csv')
  const output = parse(data, { delimiter: '\t', from: 1 })
  console.log(output)
  return output.map(row => parseFloat(row[2]))
}

exports.loadErr = () => {
  data = fs.readFileSync('app/data/data.csv')
  const output = parse(data, { delimiter: '\t', from: 1 })
  // console.log(output)
  return output.map(row => parseFloat(row[1]))
}
