var Mustache = require('mustache'),
    fs = require('fs')

function getTemplateString(fileName) {
    var template = fs.readFileSync(__dirname + '/templates/' + fileName + '.html').toString()
    Mustache.parse(template)
    return template
}

module.exports = function(data) {
    var htmlSuites = ''
    console.log(data.suites.Passing)

    var htmlData = {
        title: data.title,
        suites: htmlSuites
    }
    return Mustache.render(getTemplateString('index'), htmlData)
}