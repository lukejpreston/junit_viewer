var fs = require('fs'),
    express = require('express'),
    junit_viewer = require('./junit_viewer'),
    htmlminify = require('html-minify')

var commandArgs = {
    minify: true
}

process.argv.forEach(function(arg) {
    if (arg.indexOf('--save') !== -1)
        commandArgs.save = arg.split('=')[1]
    if (arg.indexOf('--results') !== -1)
        commandArgs.results = arg.split('=')[1] || './'
    if (arg.indexOf('--port') !== -1)
        commandArgs.port = arg.split('=')[1] || 9090
    if (arg.indexOf('--minify') !== -1)
        commandArgs.minify = arg.split('=')[1] === 'true'
    if (arg.indexOf('--help') !== -1)
        commandArgs.help = true
    if (arg.indexOf('--contracted') !== -1)
        commandArgs.contracted = "contracted"
    else
        commandArgs.contracted = ""
})



function changeToAbsolute(fileName) {
    return fileName.indexOf('/') === 0 ? fileName : process.cwd() + '/' + fileName
}

function start() {
    if (!commandArgs.hasOwnProperty('results') || commandArgs.help) {
        var message = ['Usage: ',
            'You need to specify a folder',
            '--results=folderName location of folder',
            '--port=portNumber supply a port if you want to serve',
            '--save=fileName supply a file name if you wish to save the file',
            '--contracted=provide the flag to have default view of all suits as contracted'
        ].join('\n')
        console.log(message)
    } else {
        if (commandArgs.hasOwnProperty('save')) {
            var renderedResults = junit_viewer(commandArgs.results,commandArgs.contracted)
            if (commandArgs.minify)
                renderedResults = htmlminify.minify(renderedResults)
            var saveLocation = changeToAbsolute(commandArgs.save)
            fs.writeFileSync(saveLocation, renderedResults)
            console.log('Wrote to: ', saveLocation)
        }
        if (commandArgs.hasOwnProperty('port')) {
            var app = express()

            app.get('/', function(req, res) {
                var renderedResults = junit_viewer(commandArgs.results,commandArgs.contracted)
                if (commandArgs.minify)
                    renderedResults = htmlminify.minify(renderedResults)
                res.send(renderedResults)
            })

            var server = app.listen(commandArgs.port, function() {
                var port = server.address().port
                console.log('Junit Viewer started at port:', port)
            })
            return server
        }

        if(!commandArgs.hasOwnProperty('save') && !commandArgs.hasOwnProperty('port')){
            var renderedResults = junit_viewer(commandArgs.results,commandArgs.contracted)
            if (commandArgs.minify)
                renderedResults = htmlminify.minify(renderedResults)
            console.log(renderedResults)
        }
    }
}

module.exports = {
    start: start
}
