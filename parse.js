var fs = require('fs')
var parser = require('xml2js').Parser()

function extractFullName(name, map) {
    name = name
        .replace(/-/g, '_')
        .replace(/ /g, '_')

    var fileSplit = name.split('/')
    if (name.charAt(name.length - 1) === '/')
        name = fileSplit[fileSplit.length - 2]
    else
        name = fileSplit[fileSplit.length - 1]
    var capsMatch = name.match(/[A-Z][a-z]+/g)
    name = capsMatch !== null ? capsMatch.join('_') : name
    fileSplit = name.split('.')

    if (fileSplit.length > 1) {
        name = fileSplit
            .slice(0, fileSplit.length - 1)
            .join('_')
    } else if (fileSplit.length === 1)
        name = fileSplit[0]

    var words = name.split('_')
    return map(words)
}

function capitaliseAllWords(words) {
    return words.map(capitalise).join(' ')
}

function extractFileName(fileName) {
    var fileNameSplit = fileName.split('/')
    return fileNameSplit[fileNameSplit.length - 1]
}

function capitaliseFirstWord(words) {
    words = words.map(function(word) {
        return word.toLowerCase()
    })
    return [capitalise(words[0])].concat(words.slice(1)).join(' ')
}

function capitalise(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
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
                suite = extractFullName(result.testsuite.testcase[0].$.classname, capitaliseAllWords)
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
                    if (test.error[0]._) {
                        message = test.error[0]._
                    } else {
                        message = Object.keys(test.error[0]).map(function(key) {
                            if(key !== '$')
                                return '<' + key + '>' + test.error[0][key] +'<' + key + '/>'
                            else
                                return ''
                        }).join('\n')
                    }
                } else if (test.hasOwnProperty('failure')) {
                    suiteType = 'failure'
                    type = 'failure'
                    if (test.failure[0]._) {
                        message = test.failure[0]._
                    } else {
                        message = Object.keys(test.failure[0]).map(function(key) {
                            if(key !== '$')
                                return '<' + key + '>' + test.failure[0][key] +'<' + key + '/>'
                            else
                                return ''
                        }).join('\n')
                    }
                }

                suites[suite].tests.push({
                    name: extractFullName(test.$.name, capitaliseFirstWord),
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
        title: extractFullName(fileName, capitaliseAllWords),
        suites: suites
    }
}
