var Mustache = require('mustache'),
    fs = require('fs')

var templatesCache = {}

function render(fileName, data) {
    if (!templatesCache.hasOwnProperty(fileName))
        templatesCache[fileName] = fs.readFileSync(process.cwd() + '/templates/' + fileName).toString()
    Mustache.parse(templatesCache[fileName])
    return Mustache.render(templatesCache[fileName], data)
}

function renderProperties(properties) {
    if (properties.values.length === 0)
        return

    var renderedValues = properties.values.map(function(property) {
        return render('property.html', property);
    }).join('\n')

    return render('properties.html', {
        id: properties.id,
        properties: renderedValues
    });
}

function renderTests(testCases) {
    return testCases.map(function(test) {
        var renderTestProperties = {
            id: test.id,
            type: test.type,
            name: test.name,
            time: test.time
        }

        var renderedMessages
        if (test.messages.values.length > 1) {
            var renderedMessagesValues = test.messages.values.map(function(message) {
                return render('message.html', {
                    value: message.value,
                    id: message.id,
                    multiple: '--multiple'
                })
            }).join('\n')

            renderedMessages = render('messages.html', {
                id: test.messages.id,
                messages: renderedMessagesValues
            })
            renderTestProperties.flat = 'flat'
        } else if (test.messages.values.length === 1) {
            renderedMessages = render('message.html', test.messages.values[0])
            renderTestProperties.flat = 'flat'
        }

        renderTestProperties.messages = renderedMessages

        return render('test.html', renderTestProperties)
    }).join('\n')
}

module.exports = function(data) {
    if (data.junitViewerFileError) {
        return render('no_file.html', data)
    }

    var suites = data.suites
    var renderedJavaScript = 'var suites = ' + JSON.stringify(suites) + '\n' + fs.readFileSync(process.cwd() + '/templates/junit_viewer.js').toString()

    var renderedSkeleton = fs.readFileSync(process.cwd() + '/templates/skeleton.css').toString()
    var renderedStyle = fs.readFileSync(process.cwd() + '/templates/junit_viewer.css').toString()
    var renderedOptions = render('options.html')

    var renderedSuties = suites.map(function(suite) {
        var renderedTests = renderTests(suite.testCases)
        var renderedProperties = renderProperties(suite.properties)
        var renderLabels = Object.keys(suite).filter(function(key) {
            return ['name', 'id', 'testCases', 'properties', 'type'].indexOf(key) === -1
        }).map(function(key) {
            return render('suite_label.html', {
                key: key,
                value: suite[key]
            })
        }).join('\n')

        return render('suite.html', {
            id: suite.id,
            type: suite.type,
            name: suite.name,
            tests: renderedTests,
            properties: renderedProperties,
            labels: renderLabels
        })
    }).join('\n')

    return render('index.html', {
        title: data.title,
        skeleton: fs.readFileSync(process.cwd() + '/templates/skeleton.css').toString(),
        style: fs.readFileSync(process.cwd() + '/templates/junit_viewer.css').toString(),
        options: render('options.html'),
        javascript: renderedJavaScript,
        suites: renderedSuties
    })
}
