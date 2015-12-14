var Mustache = require('mustache'),
    fs = require('fs')

var templatesCache = {}

function render(fileName, data) {
    if (!templatesCache.hasOwnProperty(fileName))
        templatesCache[fileName] = fs.readFileSync(__dirname + '/templates/' + fileName).toString()
    Mustache.parse(templatesCache[fileName])
    return Mustache.render(templatesCache[fileName], data)
}

module.exports = function(data) {
    if (data.junitViewerFileError) {
        return render('no_file.html', data)
    }

    var suites = data.suites
    var renderedJavaScript = 'var suites = ' + JSON.stringify(suites) + '\n' + fs.readFileSync(__dirname + '/templates/junit_viewer.js').toString()

    var redneredSkeleton = fs.readFileSync(__dirname + '/templates/skeleton.css').toString()
    var renderedStyle = fs.readFileSync(__dirname + '/templates/junit_viewer.css').toString()
    var renderedOptions = render('options.html')

    var renderedSuites = suites.map(function(suite) {
        suite.rendered = {}

        //render properties
        if (suite.properties) {
            suite.rendered.properties = suite.properties.map(function(properties) {
                properties.rendered = {
                    properties: properties.props.map(function(prop) {
                        return render('property.html', prop)
                    }).join('\n')
                }
                return render('properties.html', properties)
            }).join('\n')
            suite.rendered.suiteProperties = render('suite_properties.html', suite)
        }

        //render tests
        if (suite.testCases) {
            suite.rendered.tests = suite.testCases.map(function(test) {
                test.rendered = {}
                if (test.messages && test.messages.length > 1) {
                    test.rendered.messages = test.messages.map(function(message) {
                        return render('test_message.html', message)
                    }).join('\n')
                    test.rendered.testMessages = render('test_messages.html', test)
                } else if (test.messages) {
                    test.rendered.testMessages = render('test_message.html', test.messages[0])
                }
                return render('test.html', test)
            }).join('\n')
        }
        return render('suite.html', suite)
    }).join('\n')

    return render('index.html', {
        title: data.title,
        skeleton: fs.readFileSync(__dirname + '/templates/skeleton.css').toString(),
        style: fs.readFileSync(__dirname + '/templates/junit_viewer.css').toString(),
        options: render('options.html'),
        javascript: renderedJavaScript,
        suites: renderedSuites
    })
}
