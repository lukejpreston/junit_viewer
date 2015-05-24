function Dom(element) {
    return $('<' + element + '></' + element + '>')
}

function Div() {
    return Dom('div')
}

function Span() {
    return Dom('span')
}

function Br() {
    return Dom('br')
}

$.getJSON("junit.json", function(junitData) {
    var index = 0
    for (var className in junitData) {

        var data = junitData[className]

        var suite = Div()
            .attr('id', function() {
                return 's_' + index
            })
            .append(Div()
                .append(
                    Span()
                    .html(className)
                    .addClass('suite__name')
                )
                .append(
                    Span()
                    .html('Tests: ' + data.tests)
                    .addClass('suite__data')
                )
                .append(
                    Span()
                    .html('Failures: ' + data.failures)
                    .addClass('suite__data')
                )
                .addClass('suite')
            )
            .append()
            .appendTo($('#results'))

        var tests = Div()
            .addClass('tests')
        data.cases.forEach(function(testCase, caseIndex) {
            var test = Div()
                .attr('id', function() {
                    return 't_' + caseIndex
                })
                .append(
                    Span()
                    .html(testCase.name)
                    .addClass('test__name')
                )
                .append(
                    Span()
                    .html('Time: ' + parseInt(testCase.time).toFixed(2))
                    .addClass('test__time')
                )
                .addClass('test')

            if (testCase.hasOwnProperty('failureMessage'))
                test.append(
                    Br()
                ).append(
                    Span()
                    .html('Message:')
                ).append(
                    Br()
                ).append(
                    Span()
                    .html(testCase.failureMessage)
                    .addClass('test__fail')
                )
                .addClass('test--fail')
            else
                test.addClass('test--pass')

            tests.hide()
            tests.append(test)
        })
        suite.append(tests)
        suite.on('click', function(){
            $(this)
                .children('.tests')
                .slideToggle(500)
        })

        index += 1
    }
});
