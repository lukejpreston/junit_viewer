jest.autoMockOff()

var data = require('./data/output.json'),
    template = require('../template')


describe('Template', function() {
    var result = template.render(data)

    it('Replace the title with the test name', function() {
        expect(result).toContain('<title>' + data.title + '</title>')
    });
});
