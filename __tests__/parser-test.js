jest.autoMockOff()

var parser = require('../parser')

describe('Parsing junit results', function() {
    var testData = parser.parse(__dirname + '/data/')
    var singleTestData = parser.parse(__dirname + '/data/passing_suite.xml')

    it('Has the title of the file', function() {
        expect(testData.title).toBe('Data')
    })

    function hasBasicSchema(itData) {
        var name = itData.name,
            type = itData.type
        describe(name + ' suite basic schema', function() {
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

    describe('Failing test', function() {
        it('Has a message', function() {
            testData.suites.Failing.tests.forEach(function(test) {
                expect(test.message).toBeDefined()
            })
        })
    })

    describe('Error test', function() {
        it('Has a message', function() {
            testData.suites.Error.tests.forEach(function(test) {
                expect(test.message).toBeDefined()
            })
        })
    })

    describe('Properties', function() {
        it('Suites can have properties', function() {
            expect(testData.suites.Defect.properties).toBeDefined()
        })
    })

    it('Can have multiple tests', function() {
        expect(Array.isArray(testData.suites.Multi.tests)).toBe(true)
    })

    it('Adds tests in sub folders', function() {
        expect(testData.suites['Multi Sub']).toBeDefined()
    })

    it('Can parse just a single file', function() {
        expect(singleTestData).toBeDefined()
    })
})
