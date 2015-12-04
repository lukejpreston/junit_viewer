jest.autoMockOff()

var data = require('./data/output.json'),
    template = require('../template')

var rednerdView = require('jsdom').jsdom(template.render(data))

describe('Template', function() {
    it('Replace the title with the test name', function() {
        expect(rednerdView.title).toBe(data.title)
    });

    it('Has the head with the test name', function() {
        expect(rednerdView.getElementByTagName('h1')[0].innerHTML).toBe(data.title)
    })
});
