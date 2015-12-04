var Mustache = require('mustache');
var fs = require('fs');

function render(data) {
    var html = fs.readFileSync(__dirname + '/template.html').toString();
    return Mustache.render(html, data);
}

module.exports = render
