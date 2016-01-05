var fs = require('fs'),
    junit_viewer = require('./junit_viewer')

var commandArgs = {}

process.argv.forEach(function(arg) {
    if (arg.indexOf('--save') !== -1)
        commandArgs.save = arg.split('=')[1]
    if (arg.indexOf('--results') !== -1)
        commandArgs.results = arg.split('=')[1]
    if (arg.indexOf('--port') !== -1)
        commandArgs.port = arg.split('=')[1] || 9090
    if (arg.indexOf('--help') !== -1)
        commandArgs.help = true
})

function start() {
    if (!commandArgs.hasOwnProperty('results') || commandArgs.help) {
        var message = ['Usage: ',
            'You need to specify a folder',
            '--results=folderName location of folder',
            '--port=portNumber supply a port if you want to serve',
            '--save=fileName supply a file name if you wish to save the file'
        ].join('\n')
        console.log(message)
    } else {
        if (commandArgs.hasOwnProperty('save')) {
            var renderedResults = junit_viewer(commandArgs.results)
            var saveLocation = changeToAbsolute(commandArgs.save)
            fs.writeFileSync(saveLocation, renderedResults)
            console.log('Wrote to: ', saveLocation)
        }

        if (commandArgs.hasOwnProperty('port')) {
            var app = express()

            app.get('/', function(req, res) {
                res.send(junit_viewer(commandArgs.results))
            })

            var server = app.listen(commandArgs.port, function() {
                var host = server.address().address
                var port = server.address().port
                console.log('Junit Viewer Listening at http://%s:%s', host, port)
            })
        }
    }
}

module.exports = {
    start: start
}
