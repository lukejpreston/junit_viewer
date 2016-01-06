jest.autoMockOff()

var parse = require('../src/parse'),
    render = require('../src/render'),
    jsdom = require('jsdom').jsdom

describe('Parsing transforms XML to JSON (generic folder)', function() {
    var folder = 'data/test'
    var parsed = parse(folder)
    var rendered = render(parsed)
    var view = jsdom(rendered)
    it('Can walk through sub folders', function() {
        expect(getSuiteByName('sub folder suite')).toBeDefined()
    })

    it('Only picks the first suite if multiple "testsuites"', function() {
        var firstSuite = getSuiteByName('first suite in mutil')
        var secondSuite = getSuiteByName('second suite in mutil')
        expect(firstSuite).toBeDefined()
        expect(secondSuite).not.toBeDefined()
    })

    describe('Suite properties', function() {
        var suiteWithProperties = getSuiteByName('suite with properties')
        var suiteWithNoProperties = getSuiteByName('suite with no properties')

        it('Defaults to empty values', function() {
            expect(suiteWithNoProperties.properties.values.length).toBe(0)
        })

        it('Concatenates multiple properties', function() {
            expect(suiteWithProperties.properties.values.length).toBe(3)
        })

        it('Each property has a value', function() {
          expect(suiteWithProperties.properties.values[0].value).toBeDefined()
        })

        it('Each property has a name', function() {
          expect(suiteWithProperties.properties.values[0].name).toBeDefined()
        })
    })

    describe('Errors', function() {
        describe('Blank file', function() {
            var suite = getSuiteByName(folder + '/blank_file.xml')

            it('Has a name of file', function() {
                expect(suite.name).toBe(folder + '/blank_file.xml')
            })

            it('Has type failure', function() {
                expect(suite.type).toBe('failure')
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

                it('Has a message of "There are no results"', function() {
                    expect(test.messages.values[0].value).toBe('There are no results')
                })
            })
        })

        describe('Invalid XML', function() {
            var suite = getSuiteByName(folder + '/invalid.xml')

            it('Has a name of file', function() {
                expect(suite.name).toBe(folder + '/invalid.xml')
            })

            it('Has type failure', function() {
                expect(suite.type).toBe('failure')
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

                it('Has a message of "There are no results"', function() {
                    expect(test.messages.values[0].value).toBeDefined()
                })
            })
        })

    })

    function getSuiteByName(name) {
        var matchingSuite
        parsed.suites.forEach(function(suite) {
            if (suite.name === name)
                matchingSuite = suite
        })
        return matchingSuite
    }
})

describe('Edge case parsing', function() {
    it('Can parse a single file', function() {
        var fileName = 'data/test/complete.xml'
        var parsed = parse(fileName)
        expect(parsed.title).toBe('complete.xml')

    })

    it('Parses file name starting with a .', function() {
        var fileName = './data/test/complete.xml'
        var parsed = parse(fileName)
        expect(parsed.title).toBe('complete.xml')
    })
})

describe('No such file', function() {
    var fileName = 'no_such_file'
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
