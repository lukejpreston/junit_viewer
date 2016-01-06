jest.autoMockOff()

var parse = require('../src/parse'),
    render = require('../src/render'),
    jsdom = require('jsdom').jsdom

var parsed, rendered, view, fileName

describe('Folder', function() {
    var folder = 'data/test'
    var parsed = parse(folder)
    var rendered = render(parsed)
    var view = jsdom(rendered)

    describe('Parsing transforms XML to JSON', function() {
        describe('Errors', function() {
            describe('Blank file', function() {
                var test = getSuiteByName('blank file')

                it('Has a name of file', function() {
                    expect(test.name).toBe(folder + '/test_file.xml')
                })

                it('Has type failure', function() {
                    expect(test.type).toBe('failure')
                })

                it('Default time of zero', function() {
                    expect(test.time).toBe(0)
                })

                it('Default tests of zero', function() {
                    expect(test.tests).toBe(0)
                })

                it('Default of no properties', function() {
                    expect(test.properties.values.length).toBe(0)
                })

                it('Has a single test', function() {
                    expect(test.testCases.length).toBe(1)
                })

                describe('The test', function() {
                    var test = test.testCases[0]
                    it('The test is an error', function() {
                        expect(test.type).toBe('error')
                    })

                    it('Default time of zero', function() {
                        expect(test.time).toBe(0)
                    })

                    it('Has a message of "There are no results"', function() {
                        expect(test.messages.values[0].value).toBe('There are no results')
                    })
                })
            })

            describe('Invalid XML', function() {
                var suite = getSuiteByName('invalid')

                it('Has a name of file', function() {
                    expect(suite.name).toBe(folder + '/invalid.xml')
                })

                it('Has type failure', function() {
                    expect(suite.type).toBe('failure')
                })

                it('Default time of zero', function() {
                    expect(suite.time).toBe(0)
                })

                it('Default tests of zero', function() {
                    expect(suite.tests).toBe(0)
                })

                it('Default of no properties', function() {
                    expect(suite.properties.values.length).toBe(0)
                })

                it('Has a single test', function() {
                    expect(suite.testCases.length).toBe(1)
                })

                describe('The test', function() {
                    var test = suite.testCases[0]
                    it('The test is an error', function() {
                        expect(test.type).toBe('error')
                    })

                    it('Default time of zero', function() {
                        expect(test.time).toBe(0)
                    })

                    it('Has the error message', function() {
                        expect(test.messages.values[0].value).toBeDefined()
                    })
                })
            })

        })
    })

    function getSuiteByName(name) {
        name = folder + '/' + name.toLowerCase().replace(/ /g, '_') + '.xml'
        var matchingSuite = {}
        parsed.suites.forEach(function(suite) {
            if (suite.name === name)
                matchingSuite = suite
        })
        return matchingSuite
    }
})

describe('Single file', function() {
    var fileName = 'data/test/complete.xml'
    var parsed = parse(fileName)

    describe('Parsing transforms XML to JSON', function() {
        it('Has the title of the file name', function() {
            expect(parsed.title).toBe('complete.xml')
        });
    })
})

describe('No such file', function() {
    var fileName = 'bacon'
    var parsed = parse(fileName)
    var rendered = render(parsed)
    var view = jsdom(rendered)

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
