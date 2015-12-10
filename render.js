var Mustache = require('mustache'),
    fs = require('fs')

var templatesCache = {}

function render(fileName, data) {
    if (!templatesCache.hasOwnProperty(fileName))
        templatesCache[fileName] = fs.readFileSync(__dirname + '/templates/' + fileName).toString()
    Mustache.parse(templatesCache[fileName])
    return Mustache.render(templatesCache[fileName], data)
}

var hashes = []

function createUniqueHash() {
    var hash = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 5; i++) hash += possible.charAt(Math.floor(Math.random() * possible.length))
    if (hashes.indexOf(hash) === -1) {
        hashes.push(hash)
        return hash
    } else
        return createUniqueHash()
}

function addIds(suites) {
    Object.keys(suites).forEach(function(key) {
        suites[key].id = key.replace(/ /g, '_') + '_' + createUniqueHash()
        suites[key].tests.forEach(function(test, index) {
            suites[key].tests[index].id = test.name.replace(/ /g, '_') + '_' + createUniqueHash()
        })
    })
}

module.exports = function(data) {
    if (data.junitViewerFileError) {
        return render('no_file.html', data)
    }

    addIds(data.suites)

    var renderedJavaScript = render('junit_viewer.js', {
        suites: JSON.stringify(data.suites)
    })

    var renderedSuites = Object.keys(data.suites).map(function(suiteName) {
        var suite = data.suites[suiteName]
        suite.tests = suite.tests.map(function(test) {
            if (test.message)
                test.message = render('test_message.html', test).replace(/\n/g, '<br />')
            return render('test.html', test)
        }).join('\n')
        if (suite.properties) {
            var renderedProperties = Object.keys(suite.properties).map(function(key) {
                return render('property.html', {
                    key: key,
                    value: suite.properties[key]
                })
            }).join('\n')
            suite.properties = render('properties.html', {
                properties: renderedProperties
            })
        }

        return render('suite.html', suite)
    }).join('\n')

    var renderedHtml = render('index.html', {
        title: data.title,
        suites: renderedSuites,
        skeleton: fs.readFileSync(__dirname + '/templates/skeleton.css').toString(),
        javascript: renderedJavaScript
    })
    return renderedHtml
}
