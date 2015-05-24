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

function jsonResults() {
    var files = fs.readdirSync(folder)
        .filter(function(file) {
            return file.indexOf('xml') !== -1
        }).map(function(file) {
            return folder + file
        })

    var finalResults = {}
    files.map(function(file) {
        var data = fs.readFileSync(file)
        var parsedData
        parser.parseString(data, function(err, result) {
            parsedData = result
        })
        var result = {}
        var fileSplit = file.split('/')
        parsedData.name = fileSplit[fileSplit.length - 1].split('.')[0]
        return parsedData
    }).forEach(function(result) {
        var testCases = result.testsuite.testcase
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
                name: testCase.$.name,
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
