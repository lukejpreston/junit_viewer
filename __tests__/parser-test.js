jest.autoMockOff()

var parser = require('../parser')

describe('Parsing Junit Results', function() {
    var testData

    beforeEach(function() {
        testData = parser.parse('../test_data')
    });

    it('Has the title of the file', function() {
        expect(testData.title).toBe('Test Data')
    });
});
