function Dom(element) {
    return $('<' + element + '></' + element + '>');
}

function Div() {
    return Dom('div');
}

function Span() {
    return Dom('span');
}

function Br() {
    return Dom('br');
}

$('.error').hide();

$.getJSON("junit.json", function (junitData) {
    $(".title").text(junitData.title);
    $('title').text(junitData.title);
    delete junitData.title;

    var index = 0, summary = {
        suites: {
            passed: 0,
            failed: 0
        },
        tests: {
            passed: 0,
            failed: 0,
            skipped: 0
        },
        time: 0
    };
    for (var className in junitData.results) {
        if (junitData.results.hasOwnProperty(className)) {
            var data = junitData.results[className];
            var suite = Div()
                .attr('id', function () {
                    return 's_' + index;
                })
                .append(Div()
                    .append(
                        Span()
                            .html(className)
                            .addClass('suite__name')
                    ).append(
                        Span()
                            .html('Tests: ' + data.tests)
                            .addClass('suite__data')
                    ).append(
                        Span()
                            .html('Failures: ' + data.failures)
                            .addClass('suite__data')
                    ).addClass('suite')
                ).addClass("suite--contracted")
                .append()
                .appendTo($('#results'));

            if (data.failures === 0) {
                suite.addClass('suite--pass');
                summary.suites.passed++;
            } else {
                suite.addClass('suite--fail');
                summary.suites.failed++;
            }

            var tests = Div().addClass('tests');

            data.cases.forEach(function (testCase, caseIndex) {
                var test = Div()
                    .attr('id', function () {
                        return 't_' + caseIndex;
                    })
                    .append(
                        Span()
                            .html(testCase.name)
                            .addClass('test__name')
                    ).append(
                        Span()
                            .html('Time: ' + parseInt(testCase.time).toFixed(2))
                            .addClass('test__time')
                    ).addClass('test');

                if (testCase.time) {
                    summary.time += parseInt(testCase.time);
                }

                if (testCase.hasOwnProperty('failureMessage')) {
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
                    ).addClass('test--fail');
                    summary.tests.failed++;
                } else if (testCase.hasOwnProperty('skipped')) {
                    test.addClass('test--skip');
                    summary.tests.skipped++;
                } else {
                    test.addClass('test--pass');
                    summary.tests.passed++;
                }

                tests
                    .hide()
                    .append(test);
            });
            suite
                .append(tests)
                .on('click', function () {
                    var self = $(this);
                    self
                        .children('.tests')
                        .slideToggle(500);

                    if (self.hasClass("suite--contracted")) {
                        self.removeClass("suite--contracted");
                        self.addClass("suite--expanded");
                    } else {
                        self.addClass("suite--contracted");
                        self.removeClass("suite--expanded");
                    }
                });
            index += 1;
        }
    }
    $('#summary').html(
        (summary.suites.failed + summary.suites.passed) + " suites (" +
        summary.suites.failed + " failed, " + summary.suites.passed + " passed), " +
        (summary.tests.failed + summary.tests.passed + summary.tests.skipped) + " tests (" +
        summary.tests.failed + " failed, " + summary.tests.skipped + " skipped, " +
        summary.tests.passed + " passed), Runtime: " + formatTime(summary.time)
    );
    if (index === 0 || junitData.results.hasOwnProperty("NO FOLDER SPECIFIED FOR JUNIT VIEWER")) {
        $('.error').show();
    }
});

function formatTime(ms) {
    function convertMS(ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        return { d: d, h: h, m: m, s: s };
    }
    ms = convertMS(ms);
    return ms.h + ' h. ' + ms.m + ' min. ' + ms.s + ' sec.';
}

function filter() {
    $(".test--pass").slideToggle(500);
    $(".suite--pass").slideToggle(500);
    var text = $(".filter").text();
    if (text.indexOf("Filter") !== -1) {
        $(".filter").text("Insert Passing");
    } else {
        $(".filter").text("Filter Passing");
    }
}

function expand() {
    var text = $(".expand").text();
    if (text.indexOf("Expand") !== -1) {
        $(".expand").text("Contract All");
        $(".suite--contracted").click();
    } else {
        $(".suite--expanded").click();
        $(".expand").text("Expand All");
    }
}
