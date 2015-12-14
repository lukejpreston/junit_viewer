var fs = require('fs')
var parser = require('xml2js').Parser()

var hashes = []

function createUniqueHash(identifier) {
    if (identifier)
        identifier = identifier + '_'
    else
        identifier = ''
    var hash = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 5; i++) hash += possible.charAt(Math.floor(Math.random() * possible.length))
    if (hashes.indexOf(hash) === -1) {
        hashes.push(hash)
        return identifier + hash
    } else
        return createUniqueHash(identifier)
}

function extractFileName(fileName) {
    var fileNameSplit = fileName.split('/')
    var name = fileNameSplit[fileNameSplit.length - 1]
    if (name === '')
        name = fileNameSplit[fileNameSplit.length - 2]
    return name
}

function isDirectory(folder) {
    return fs.lstatSync(folder).isDirectory()
}

function normaliseFileName(fileName) {
    if (fileName.charAt(0) === '.')
        fileName = __dirname + '/' + fileName

    if (!fs.existsSync(fileName)) {
        console.log(fileName, 'does not exist')
        return fileName + ' FILE DOES NOT EXIST'
    }

    if (isDirectory(fileName) && fileName.charAt(fileName.length - 1) !== '/')
        fileName = fileName + '/'

    return fileName
}

function isXml(fileName) {
    var fileSplit = fileName.split('.')
    return fileSplit[fileSplit.length - 1] === 'xml'
}

function createError(fileName, message) {
    return {
        name: fileName,
        type: 'failure',
        time: 0,
        tests: [{
            name: fileName,
            message: message,
            time: 0,
            type: 'error'
        }]
    }
}

function parseTestResult(fileName, suites) {
    if (!isXml(fileName))
        return

    var data = fs.readFileSync(fileName).toString()
    parser.parseString(data, function(err, result) {
        if (err !== null)
            suites[fileName] = createError(fileName, err.toString())
        else if (result === null)
            suites[fileName] = createError(fileName, 'There are no results')
        else {
            result.testsuite.testcase.forEach(function(testResult) {
                //create/get suite
                var classname = testResult.$.classname || 'NO CLASS NAME'
                var suite = suites[classname] || {
                    id: createUniqueHash('suite'),
                    type: 'passed',
                    name: classname,
                    time: result.testsuite.$.time,
                    tests: result.testsuite.$.tests,
                    failures: result.testsuite.$.failures
                }

                //add properties
                var properties
                if (result.testsuite.hasOwnProperty('properties')) {
                    properties = []
                    result.testsuite.properties.forEach(function(property) {
                        var props = property.property
                        properties.push({
                            id: createUniqueHash('properties'),
                            props: props.map(function(prop) {
                                var prop = prop.$
                                prop.id = createUniqueHash('property')
                                return prop
                            })
                        })
                    })
                }
                suite.properties = properties

                //add tests
                suite.testCases = suite.testCases || []
                var test = {
                    id: createUniqueHash('test'),
                    time: testResult.$.time,
                    name: testResult.$.name || 'NO TEST NAME',
                }

                test.type = 'passed'

                if (testResult.skipped) {
                    test.type = 'skipped'
                    if (testResult.skipped !== '') {
                        test.messages = testResult.skipped.map(function(message) {
                            return {
                                id: createUniqueHash('message'),
                                message: message
                            }
                        })
                    }

                } else if (testResult.error) {
                    suite.type = 'failure'
                    test.type = 'error'
                    test.messages = testResult.error.map(function(message) {
                        return {
                            id: createUniqueHash('message'),
                            message: message._
                        }
                    })
                } else if (testResult.failure) {
                    suite.type = 'failure'
                    test.type = 'failure'
                    test.messages = testResult.failure.map(function(message) {
                        return {
                            id: createUniqueHash('message'),
                            message: message._
                        }
                    })
                }

                suite.testCases.push(test)
                suites[classname] = suite
            })
        }
    })
}

function runThroughFolder(folder, suites) {
    fs.readdirSync(folder).forEach(function(file) {
        var fileName = normaliseFileName(folder + file)
        if (isDirectory(fileName)) {
            runThroughFolder(fileName, suites)
        } else {
            parseTestResult(fileName, suites)
        }
    })
}

module.exports = function(fileName) {
    fileName = normaliseFileName(fileName)
    if (fileName.indexOf('FILE DOES NOT EXIST') !== -1)
        return {
            junitViewerFileError: fileName.slice(0, fileName.indexOf('FILE DOES NOT EXIST') - 1)
        }

    var suites = {}
    if (isDirectory(fileName))
        runThroughFolder(fileName, suites)
    else
        parseTestResult(fileName, suites)

    suites = Object.keys(suites).map(function(key) {
        return suites[key]
    })

    return {
        title: extractFileName(fileName),
        suites: suites
    }
}
