jest.autoMockOff()

var parser = require('../parser')

describe('Parsing junit results', function() {
    var testData = parser.parse(__dirname + '/data')

    it('Has the title of the file', function() {
        expect(testData.title).toBe('Data')
    })

    describe('Passing suite', function() {
        var suite = testData.suites.Passing

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

                it('Has type of "passed"', function() {
                    expect(test.type).toBe('passed')
                })
            })
        })
    })

    describe('Failing suite', function() {
        var suite = testData.suites.Failing

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

                it('Has type of "passed"', function() {
                    expect(test.type).toBe('passed')
                })
            })
        })
    })
})
