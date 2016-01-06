jest.autoMockOff()

var parse = require('../src/parse'),
    render = require('../src/render'),
    jsdom = require('jsdom').jsdom

var parsed, rendered, view, fileName

describe('Junit Viewer', function() {
    fileName = 'data/test'
    parsed = parse(fileName)
    rendered = render(parsed)
    view = jsdom(rendered)

    describe('Parsing transforms XML to JSON', function() {

    })

    describe('Rendering the JSON into HTML', function() {

    })

    describe('Layout', function() {

    })

    describe('Features', function() {

    })
})

describe('No such file', function() {
    fileName = 'bacon'
    parsed = parse(fileName)
    rendered = render(parsed)
    view = jsdom(rendered)

    describe('Parsing transforms XML to JSON', function() {
        it('Just returns an error', function() {
            expect(parsed.junitViewerFileError).toBe(fileName)
        })
    })

    describe('Rendering the JSON into HTML', function() {
        it('Renders a html file with the expected file name inside', function() {
            expect(rendered).toContain(fileName)
        })
    })

    describe('Layout', function() {
        it('Has a title No Such File', function() {
            expect(view.getElementsByTagName('h1')[0].innerHTML).toBe('No Such File')
        })
    })
})

function get(id) {
    return view.getElementById(id)
}

function getInnerHtml(id) {
    return get(id).innerHTML
}
