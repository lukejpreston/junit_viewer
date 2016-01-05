var fs = require('fs'),
    parse = require('./parse'),
    render = require('./render')

function changeToAbsolute(fileName) {
    return fileName.indexOf('/') === 0 ? fileName : process.cwd() + '/' + fileName
}

module.exports = function(results) {
    var resultsFile = changeToAbsolute(results)
    var data = parse(resultsFile)
    return render(data)
}
