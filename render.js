var Mustache = require('mustache');
var fs = require('fs');

module.exports = function(data) {
    var html = fs.readFileSync(__dirname + '/template.html').toString();
    return Mustache.render(html, data);
}
