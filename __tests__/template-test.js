jest.autoMockOff()

var data = require('./data/output.json'),
    template = require('../template')

var thingy = require('jsdom').jsdom(template.render(data))

describe('Template', function() {
    it('Replace the title with the test name', function() {
        expect(thingy.title).toBe(data.title)
    });
});
