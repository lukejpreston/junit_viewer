var Mustache = require('mustache'),
    fs = require('fs')

var templatesCache = {}

function render(fileName, data) {
    if (!templatesCache.hasOwnProperty(fileName))
        templatesCache[fileName] = fs.readFileSync(__dirname + '/templates/' + fileName + '.html').toString()
    Mustache.parse(templatesCache[fileName])
    return Mustache.render(templatesCache[fileName], data)
}

module.exports = function(data) {
    var renderedSuites = Object.keys(data.suites).map(function(suiteName) {
        var suite = data.suites[suiteName]
        if (suite.error)
            suite.tests = render('syntax_error', suite).replace(/\n/g, '<br />')
        else
            suite.tests = suite.tests.map(function(test) {
                if (test.hasOwnProperty('message'))
                    test.message = render('test_message', test).replace(/\n/g, '<br />')
                return render('test', test)
            }).join('\n')
        return render('suite', suite)
    }).join('\n')

    var renderedHtml = render('index', {
        title: data.title,
        suites: renderedSuites
    })

    fs.writeFileSync('example_output.html', renderedHtml)

    return renderedHtml
}
