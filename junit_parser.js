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

$('.error').hide()

$.getJSON("junit.json", function(junitData) {
    $(".title").text(junitData.title)
    $('title').text(junitData.title)
    delete junitData.title

    var index = 0
    for (var className in junitData.results) {
        var data = junitData.results[className]
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
            .addClass("suite--contracted")
            .append()
            .appendTo($('#results'))

        if (data.failures === 0)
            suite.addClass('suite--pass')
        else
            suite.addClass('suite--fail')

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
                    .html(testCase.failureMessage.replace(/(?:\r\n|\r|\n)/g, '<br />'))
                    .addClass('test__fail')
                )
                .addClass('test--fail')
            else
                test.addClass('test--pass')

            tests
                .hide()
                .append(test)
        })
        suite
            .append(tests)
            .on('click', function() {
                var self = $(this)
                self
                    .children('.tests')
                    .slideToggle(500)

                if (self.hasClass("suite--contracted")) {
                    self.removeClass("suite--contracted")
                    self.addClass("suite--expanded")
                } else {
                    self.addClass("suite--contracted")
                    self.removeClass("suite--expanded")
                }
            })
        index += 1
    }
    if (index === 0 || junitData.results.hasOwnProperty("NO FOLDER SPECIFIED FOR JUNIT VIEWER")) {
        $('.error').show()
    }
})

function filter() {
    $(".test--pass").slideToggle(500)
    $(".suite--pass").slideToggle(500)
    var text = $(".filter").text()
    if (text.indexOf("Filter") !== -1)
        $(".filter").text("Insert Passing")
    else
        $(".filter").text("Filter Passing")
}

function expand() {
    
    var text = $(".expand").text()
    if (text.indexOf("Expand") !== -1) {
        $(".expand").text("Contract All")
        $(".suite--contracted").click()
    }
    else {
        $(".suite--expanded").click()
        $(".expand").text("Expand All")
    }
}
