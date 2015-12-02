jest.autoMockOff()

var template = require('../template')

describe('Template', function() {
    var data = {
        title: 'Bacon'
    }
    var result = template.render(data)

    it('Replace the title with the test name', function() {
        expect(result).toContain('<title>Bacon</title>')
    });
});
