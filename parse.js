var fs = require('fs')
var parser = require('xml2js').Parser()

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

function parseTestResult(fileName, suites) {
    if (!isXml(fileName))
        return

    var data = fs.readFileSync(fileName).toString()
    parser.parseString(data, function(err, result) {
        if (err !== null)
            suites[extractFileName(fileName)] = {
                name: fileName,
                type: 'failure',
                time: 0,
                tests: [{
                    name: fileName,
                    message: err.toString(),
                    time: 0,
                    type: 'error'
                }]
            };
        else if (result === null)
            suites[extractFileName(fileName)] = {
                name: fileName,
                type: 'failure',
                time: 0,
                tests: [{
                    name: fileName,
                    message: 'There are no results',
                    time: 0,
                    type: 'error'
                }]
            };

        else {
            var suiteType = 'passed'
            var suite = 'No Class Name'
            if (result.testsuites) {
                result = result.testsuites
            }

            if (Array.isArray(result.testsuite))
                result.testsuite = result.testsuite[0]

            if (result.testsuite.testcase === undefined)
                result.testsuite.testcase = []

            if (result.testsuite.testcase.length > 0 && result.testsuite.testcase[0].$.classname)
                suite = result.testsuite.testcase[0].$.classname
            var properties
            if (result.testsuite.hasOwnProperty('properties')) {
                properties = {}
                var resultProperties = result.testsuite.properties[0].property
                for (var i = 0; i < resultProperties.length; i++)
                    properties[resultProperties[i].$.name] = resultProperties[i].$.value
            }

            suites[suite] = suites[suite] || {
                name: suite,
                tests: [],
                properties: properties,
                time: result.testsuite.$.time
            }

            result.testsuite.testcase.forEach(function(test) {
                var type = 'passed',
                    message

                if (test.hasOwnProperty('skipped'))
                    type = 'skipped'
                else if (test.hasOwnProperty('error')) {
                    suiteType = 'failure'
                    type = 'error'
                    message = test.error[0]._
                } else if (test.hasOwnProperty('failure')) {
                    suiteType = 'failure'
                    type = 'failure'
                    message = test.failure[0]._
                }

                suites[suite].tests.push({
                    name: test.$.name,
                    type: type,
                    message: message,
                    time: test.$.time
                })
            })

            suites[suite].type = suiteType
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

    return {
        title: extractFileName(fileName),
        suites: suites
    }
}
