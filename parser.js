function extractTitle(fileName) {
    fileName = fileName
        .replace(/-/g, '_')
        .replace(/ /g, '_')
    var capsMatch = fileName.match(/[A-Z][a-z]+/g)
    fileName = capsMatch !== null ? capsMatch.join('_') : fileName

    var fileSplit = fileName.split('/')
    var fileName = fileSplit[fileSplit.length - 1]
    fileSplit = fileName.split('.')
    if (fileSplit.length > 1)
        fileName = fileSplit
        .slice(0, fileSplit.length - 1)
        .join('_')
    else if (fileSplit.length === 1)
        fileName = fileSplit[0]

    return fileName.split('_')
        .map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(' ')
}

module.exports = {
    parse: function(fileName) {
        var parser = require('xml2js').Parser()

        return {
            title: extractTitle(fileName)
        }
    }
}
