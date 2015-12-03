jest.autoMockOff()

var parser = require('../parser')

describe('Parsing junit results', function() {
    var testData = parser.parse(__dirname + '/data')

    it('Has the title of the file', function() {
        expect(testData.title).toBe('Data')
    })

    function hasBasicSchema(itData) {
        var name = itData.name,
            type = itData.type
        describe(name + ' suite', function() {
            var suite = testData.suites[name]

            it('Has a name', function() {
                expect(suite.name).toBeDefined()
            })

            it('Has the time', function() {
                expect(suite.time).toBeDefined()
            })

            describe('Each test', function() {
                suite.tests.forEach(function(test) {
                    it('Has a name', function() {
                        expect(test.name).toBeDefined()
                    })

                    it('Has type of "' + type + '"', function() {
                        expect(test.type).toBe(type)
                    })
                })
            })
        })
    }

    [{
        name: 'Passing',
        type: 'passed'
    }, {
        name: 'Failing',
        type: 'failure'
    }, {
        name: 'Error',
        type: 'error'
    }, {
        name: 'Skipped',
        type: 'skipped'
    }].forEach(hasBasicSchema)
})
