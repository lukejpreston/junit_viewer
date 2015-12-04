jest.autoMockOff()

var data = require('./data/output.json'),
    template = require('../template')

var rednerdView = require('jsdom').jsdom(template.render(data))

function get(id) {
    return rednerdView.getElementById(id)
}

function getInnerHtml(id) {
    return get(id).innerHTML
}

describe('Template', function() {
    it('Replace the title with the test name', function() {
        expect(rednerdView.title).toBe(data.title)
    });

    it('Has the head with the test name', function() {
        expect(getInnerHtml('title')).toBe(data.title)
    })
});
