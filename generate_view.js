var fs = require('fs'),
    parse = require('./parse'),
    render = require('./render')

var validData = parse(__dirname + '/__tests__/data/complete_multi_suites.xml')
fs.writeFileSync('valid_data.json', JSON.stringify(validData))
var redneredValidData = render(validData)
fs.writeFileSync('valid_data.html', redneredValidData)

var singleFile = parse(__dirname + '/__tests__/data/multi_suite.xml')
var renderedSingleFile = render(singleFile)
fs.writeFileSync('single_file.html', renderedSingleFile)

var noFile = parse(__dirname + '/__tests__/dat')
var renderedNoFile = render(noFile)
fs.writeFileSync('no_file.html', renderedNoFile)