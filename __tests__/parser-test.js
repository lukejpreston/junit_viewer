jest.autoMockOff()

var parser = require('../parser')

describe('Parsing Junit Results', function() {
    var testData = parser.parse(__dirname + '/data')

    it('Has the title of the file', function() {
        expect(testData.title).toBe('Test Data')
    });

    describe('Passing tests', function() {
        it('Has a name', function() {
            console.log(JSON.stringify(testData))
            expect(testData.tests).toBeDefined()
        });

    });
});


// { title: 'Test Data',
//   data:
//    { 'Test 3':
//       { 'Player Has a name Name Works Money': [Object],
//         'Player Has a name Name Fails': [Object] },
//      'Test 4': { 'Player Has a name Name Works Money': [Object] },
//      Test:
//       { 'Player Has a name Name Works Money': [Object],
//         'Player Has a name Name Fails': [Object] },
//      'Test 2':
//       { 'Player Has a name Name Works Money': [Object],
//         'Player Has a name Name Fails': [Object] },
//      'Test 5':
//       { 'Player Has a name Name Works Money': [Object],
//         'Player Has a name Name Fails': [Object],
//         'Player Has a name Name Skippek': [Object],
//         'Player Has a name Error': [Object] } } }
