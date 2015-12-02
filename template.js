module.exports = {
    render: function(data) {
        var Mustache = require('mustache');
        var fs = require('fs');
        var html = fs.readFileSync(__dirname + '/template.html').toString();
        return Mustache.render(html, data);
    }
}
