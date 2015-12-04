jest.autoMockOff()

var data = require('./data/output.json')

var rednerdView = require('jsdom')
    .jsdom(
        require('../render')(
            data
        )
    )

function get(id) {
    return rednerdView.getElementById(id)
}

function getInnerHtml(id) {
    return get(id).innerHTML
}

describe('Template', function() {
    it('Replace the title with the test name', function() {
        expect(rednerdView.title).toBe(data.title)
    })

    it('Has the head with the test name', function() {
        expect(getInnerHtml('title')).toBe(data.title)
    })
})
