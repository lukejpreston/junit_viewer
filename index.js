var path = require('path'),
    fs = require('fs'),
    parser = new require('xml2js').Parser();


var commandArgs = {};

process.argv.forEach(function(arg) {
    if (arg.indexOf('--save') !== -1) {
        commandArgs.save = arg.split('=')[1] || 'junit.html';
    }
    if (arg.indexOf('--results') !== -1) {
        commandArgs.results = arg.split('=')[1] || './test_data';
    }
    if (arg.indexOf('--port') !== -1) {
        commandArgs.port = arg.split('=')[1] || 9090;
    }
});

var resultsFolder = commandArgs.results || './test_data';
resultsFolder = resultsFolder.replace('\\', '/');

if (resultsFolder.charAt(0) == '.' && resultsFolder.charAt(1) == '/') {
    resultsFolder = resultsFolder.replace('./', '');
}

var isFolder = fs.lstatSync(resultsFolder).isDirectory();

if (isFolder && resultsFolder.charAt(resultsFolder.length - 1) !== '/') {
    resultsFolder += '/';
}

function getFiles(folder) {
    var files = [];
    fs.readdirSync(folder).forEach(function (file) {
        if (fs.lstatSync(folder + '/' + file).isDirectory()) {
            files = files.concat(getFiles(folder + '/' + file));
        } else {
            files.push(folder + '/' + file);
        }
    });

    return files.filter(function(file) {
        return /\.xml$/i.test(file);
    });
}

function getFile(file) {
    return [file].filter(function(file) {
        return /\.xml$/i.test(file);
    });
}

function readResultFiles() {
    var files = (isFolder ? getFiles(resultsFolder) : getFile(resultsFolder));
    var results = [];
    files.map(function(file) {
        var data = fs.readFileSync(file);
        var parsedData;
        parser.parseString(data, function(err, result) {
            parsedData = result || {};
        });
        var fileSplit = file.split('/');
        parsedData.name = fileSplit[fileSplit.length - 1].split('.')[0];
        return parsedData;
    }).filter(function(result) {
        return result.hasOwnProperty('testsuite') || result.hasOwnProperty('testsuites');
    }).forEach(function(file) {
        if (file.hasOwnProperty('testsuites')) {
            file.testsuites.testsuite.forEach(function(test) {
                results = results.concat(test);
            });
        } else {
            results.push(file.testsuite);
        }
    });
    return results.filter(function(result) {
        return result.testcase !== undefined;
    });
}

function jsonResults() {
    var finalResults = {};
    var testSuites = readResultFiles();

    testSuites.forEach(function(result) {
        var testCases = result.testcase;
        testCases.forEach(function(testCase) {
            var name = testCase.$.classname;
            if (!finalResults.hasOwnProperty(name)) {
                finalResults[name] = {
                    tests: 0,
                    failures: 0,
                    cases: []
                };
                if (result.hasOwnProperty('properties')) {
                    finalResults[name].properties = {};
                    result.properties[0].property.forEach(function(property){
                        finalResults[name].properties[property.$.name] = property.$.value;
                    })
                }
            }

            finalResults[name].tests += 1;

            var newCase = {
                name: testCase.$.name.replace(new RegExp('\n', 'g'), '<br />'),
                time: testCase.$.time
            };

            if (testCase.hasOwnProperty('failure')) {
                finalResults[name].failures += 1;
                newCase.failureMessage = testCase.failure[0]._;
            } else if (testCase.hasOwnProperty('skipped')) {
                newCase.skipped = true;
            }
            finalResults[name].cases.push(newCase);
        });
    });
    return finalResults;
}

var express = require('express');

function getTitle() {
    var folderSplit = resultsFolder.split('/');
    var title = folderSplit[folderSplit.length - (isFolder ? 2 : 1)];
    title = title.replace(new RegExp('_', 'g'), ' ');
    var fullTitle = [];
    title.split(' ').forEach(function(word) {
        fullTitle.push(word[0].toUpperCase() + word.slice(1));
    });
    return fullTitle.join(' ');
}

function startServer() {
    var app = express();
    app.use(express.static(__dirname));

    app.get('/junit.json', function(req, res) {
        res.send({
            results: jsonResults(),
            title: getTitle()
        });
    });

    app.listen(commandArgs.port);
    console.log('Running and viewer at http://localhost:' + commandArgs.port);
}

function save() {
    var thing = fs.readFileSync(__dirname + '/template.html')
        .toString()
        .replace('REPLACEWITHJUNITDATA', JSON.stringify({
            results: jsonResults(),
            title: getTitle()
        }));
    fs.writeFile(commandArgs.save, thing, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved:", commandArgs.save);
    });
}

function start() {
    if (!commandArgs.hasOwnProperty('results')) {
        var message = ['Usage: ',
            'You need to specify a folder',
            '--results=folderName location of folder',
            '--port=portNumber supply a port if you want to serve',
            '--save=fileName supply a file name if you wish to save the file'
        ].join('\n');
        console.log(message);
    } else {
        if (commandArgs.port) {
            startServer();
        }
        if (commandArgs.save) {
            save();
        }
    }
}

module.exports = {
    start: start
};
