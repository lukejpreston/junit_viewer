// var suites = {{{suites}}}

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

var hide = {
    passing: {
        suites: function(element) {

        },
        tests: function(element) {

        }
    },
    tests: function(element) {

    },
    properties: function(element) {

    }
}

var contract = {
    suites: function(element) {

    },
    tests: function(element) {

    },
    properties: function(element) {

    }
}

var search = {
    suites: function(value) {

    },
    tests: function(value) {

    },
    properties: function(value) {

    }
}
