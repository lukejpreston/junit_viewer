var Mustache = require('mustache'),
    fs = require('fs')

// make the templates cache in a way that is friendly to the browserify filesystem plugin
var templatesCache = {}

function addTemplate(fileName, accessor) {
    var data
    Object.defineProperty(templatesCache, fileName, {
        get: function () {
            if (data) {
                return data
            }

            data = accessor()
            return data
        }
    })
}

addTemplate('property.html', function () { return fs.readFileSync(__dirname + '/../templates/property.html').toString() })
addTemplate('properties.html', function () { return fs.readFileSync(__dirname + '/../templates/properties.html').toString() })
addTemplate('message.html', function () { return fs.readFileSync(__dirname + '/../templates/message.html').toString() })
addTemplate('messages.html', function () { return fs.readFileSync(__dirname + '/../templates/messages.html').toString() })
addTemplate('label.html', function () { return fs.readFileSync(__dirname + '/../templates/label.html').toString() })
addTemplate('test.html', function () { return fs.readFileSync(__dirname + '/../templates/test.html').toString() })
addTemplate('suite.html', function () { return fs.readFileSync(__dirname + '/../templates/suite.html').toString() })
addTemplate('junit_info.html', function () { return fs.readFileSync(__dirname + '/../templates/junit_info.html').toString() })
addTemplate('no_file.html', function () { return fs.readFileSync(__dirname + '/../templates/no_file.html').toString() })
addTemplate('index.html', function () { return fs.readFileSync(__dirname + '/../templates/index.html').toString() })
addTemplate('options.html', function () { return fs.readFileSync(__dirname + '/../templates/options.html').toString() })

function render(fileName, data) {
    var template = templatesCache[fileName]
    Mustache.parse(template)
    return Mustache.render(template, data)
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
            name: test.name
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

        renderTestProperties.labels = Object.keys(test).filter(function(key) {
            return key !== 'id' && key !== 'type' && key !== 'name' && key !== 'messages' && key !== 'classname'
        }).map(function(key) {
            return render('label.html', {
                key: key,
                value: test[key]
            })
        }).join('\n')


        return render('test.html', renderTestProperties)
    }).join('\n')
}

function renderSuites(suites) {
    return suites.map(function(suite) {
        var renderedTests = renderTests(suite.testCases)
        var renderedProperties = renderProperties(suite.properties)
        var renderLabels = Object.keys(suite).filter(function(key) {
            return ['name', 'id','contracted', 'testCases', 'properties', 'type'].indexOf(key) === -1
        }).map(function(key) {
            return render('label.html', {
                key: key,
                value: suite[key]
            })
        }).join('\n')

        return render('suite.html', {
            id: suite.id,
            contracted: suite.contracted,
            type: suite.type,
            name: suite.name,
            tests: renderedTests,
            properties: renderedProperties,
            labels: renderLabels
        })
    }).join('\n')
}

function renderJunitInfo(info) {
    var redneredJunitInfo = {
        suites: '',
        tests: ''
    }
    redneredJunitInfo.suites = render('junit_info.html', {
        kind: 'suite',
        name: 'suite',
        type: 'count',
        count: info.suites.count
    })

    redneredJunitInfo.suites = redneredJunitInfo.suites + Object.keys(info.suites).filter(function(key) {
        return key !== 'count'
    }).map(function(key) {
        return render('junit_info.html', {
            kind: 'suite',
            name: key,
            type: key,
            count: info.suites[key]
        })
    }).join('\n')

    redneredJunitInfo.tests = redneredJunitInfo.tests + '\n' + render('junit_info.html', {
        kind: 'test',
        name: 'test',
        type: 'count',
        count: info.tests.count
    })

    redneredJunitInfo.tests = redneredJunitInfo.tests + Object.keys(info.tests).filter(function(key) {
        return key !== 'count'
    }).map(function(key) {
        return render('junit_info.html', {
            kind: 'test',
            name: key,
            type: key,
            count: info.tests[key]
        })
    }).join('\n')

    return redneredJunitInfo
}

module.exports = function(data) {
    if (data.junitViewerFileError)
        return render('no_file.html', data)

    var suites = data.suites
    var junit_info = data.junit_info
    var renderedJavaScript = 'var junit_info = ' + JSON.stringify(junit_info) + '\n var suites = ' + JSON.stringify(suites) + '\n' + fs.readFileSync(__dirname + '/../templates/junit_viewer.js').toString()
    var renderedSuites = renderSuites(suites)

    var redneredJunitInfo = renderJunitInfo(junit_info)

    return render('index.html', {
        junit_info: redneredJunitInfo,
        title: data.title,
        skeleton: fs.readFileSync(__dirname + '/../templates/skeleton.css').toString(),
        style: fs.readFileSync(__dirname + '/../templates/junit_viewer.css').toString(),
        options: render('options.html'),
        javascript: renderedJavaScript,
        suites: renderedSuites
    })
}
