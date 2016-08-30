var fs = require('fs'),
    parse = require('./parse').parse,
    render = require('./render')

function changeToAbsolute(fileName) {
    return fileName.indexOf('/') === 0 ? fileName : process.cwd() + '/' + fileName
}

module.exports = function(results,contracted) {
    var resultsFile = changeToAbsolute(results)
    var data = parse(resultsFile,contracted)
    return render(data)
}
