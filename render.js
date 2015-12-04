var Mustache = require('mustache'),
    fs = require('fs')

function getTemplateString(fileName) {
    var template = fs.readFileSync(__dirname + '/templates/' + fileName + '.html').toString()
    Mustache.parse(template)
    return template
}

module.exports = function(data) {
    var htmlSuites = []

    Object.keys(data.suites).forEach(function(suite) {
        suite.tests.forEach(function(test) {
            console.log(test.type)
        })
    })

    var htmlData = {
        title: data.title,
        suites: htmlSuites
    }
    return Mustache.render(getTemplateString('index'), htmlData)
}