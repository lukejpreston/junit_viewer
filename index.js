var path = require('path'),
    fs = require('fs'),
    parser = new require('xml2js').Parser()

var folder = process.argv.slice(2)[0] || './'

if (folder.charAt(0) == '.') {
    folder = __dirname + folder.slice(1)
}
if (folder.charAt(folder.length - 1) !== '/') {
    folder += '/'
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function getFiles(folder) {
    var files = []
    fs.readdirSync(folder).forEach(function(file) {
        if(fs.lstatSync(folder +'/'+ file).isDirectory()) {
            files = files.concat(getFiles(folder +'/'+ file))
        } else {
            files.push(folder +'/'+ file)
        }
    })

    return files.filter(function(file) {
        var suffix = '.xml'
        return file.indexOf(suffix, file.length - suffix.length) !== -1
    })
}

function jsonResults() {
    var files = getFiles(folder)

    var finalResults = {}
    var testFiles = files.map(function(file) {
        var data = fs.readFileSync(file)
        var parsedData
        parser.parseString(data, function(err, result) {
            parsedData = result || {}
        })
        var fileSplit = file.split('/')
        parsedData.name = fileSplit[fileSplit.length - 1].split('.')[0]
        return parsedData
    }).filter(function(result){
        return result.hasOwnProperty('testsuite') || result.hasOwnProperty('testsuites')
    })

    var results = []
    testFiles.forEach(function(file) {
        if(file.hasOwnProperty('testsuites')) {
            file.testsuites.testsuite.forEach(function(test) {
                results = results.concat(test)
            })
        } else {
            results.push(file.testsuite)
        }
    })

    results.forEach(function(result) {
        var testCases = result.testcase
        testCases.forEach(function(testCase) {
            var name = testCase.$.classname
            if (!finalResults.hasOwnProperty(name)) {
                finalResults[name] = {
                    tests: 0,
                    failures: 0,
                    cases: []
                }
            }

            finalResults[name].tests += 1

            var newCase = {
                name: testCase.$.name.replace(new RegExp('\n', 'g'), '<br />'),
                time: testCase.$.time
            }

            if (testCase.hasOwnProperty('failure')) {
                finalResults[name].failures += 1
                newCase.failureMessage = testCase.failure[0]._
            }
            finalResults[name].cases.push(newCase)
        })
    })
    return finalResults
}

var express = require('express')

function start() {
    app = express()
    app.use(express.static(__dirname))

    app.get('/junit.json', function(req, res) {
        res.send(jsonResults());

    });

    app.listen(4738);
    console.log('Listening on port 4738');
}

module.exports = {
    start: start
}
