var suites = {{{suites}}}

function contract(element) {
    if (element.children[1]) {
        var shownAs = element.children[1].tBodies !== undefined ? 'table' : 'block'
        var display = element.children[1].style.display
        element.children[1].style.display = display !== 'none' ? 'none' : shownAs
        element.children[0].style['border-radius'] = display !== 'none' ? '4px' : '4px 4px 0 0'
    }
}

function forEachSuite(callback) {
    Object.keys(suites).forEach(function(key) {
        callback(suites[key])
    })
}

function forEachTest(callback) {
    forEachSuite(function(suite) {
        suite.tests.forEach(function(test) {
            callback(test, suite)
        })
    })
}

function hideSuites(element) {
    var shown = element.innerHTML.indexOf('HIDE') !== -1
    element.innerHTML = (shown ? 'SHOW' : 'HIDE') + ' PASSING SUITES'

    forEachSuite(function(suite) {
        if (suite.type === 'passed')
            document.getElementById(suite.id).style.display = shown ? 'none' : 'block'
    })
}

function hideTests(element) {
    var shown = element.innerHTML.indexOf('HIDE') !== -1
    element.innerHTML = (shown ? 'SHOW' : 'HIDE') + ' PASSING TESTS'

    forEachTest(function(test) {
        if (test.type === 'passed' || test.type === 'skipped')
            document.getElementById(test.id).style.display = shown ? 'none' : 'block'
    })
}

function contractSuites(element) {
    var contracted = element.innerHTML.indexOf('CONTRACT') !== -1
    element.innerHTML = (contracted ? 'EXPAND' : 'CONTRACT') + ' PASSING SUITES'

    forEachSuite(function(suite) {
        if (suite.type === 'passed')
            document.getElementById(suite.id).style.display = contracted ? 'none' : 'block'
    })
}