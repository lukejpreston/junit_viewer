var suites = {{{suites}}}

function createToggleDisplay(by) {
    return function(element) {
        var isHidden = element.className.indexOf(' hide--' + by) !== -1
        if (isHidden)
            element.className = element.className.replace(' hide--' + by, '')
        else
            element.className = element.className + ' hide--' + by
        return !isHidden
    }
}

function toggleCorners(element, isHidden) {
    if (isHidden) {
        element.className = element.className.replace(' flat', '')
        element.className = element.className + ' round'
    } else {
        element.className = element.className.replace(' round', '')
        element.className = element.className + ' flat'
    }
}

var toggleBy = {
    searching: createToggleDisplay('searching'),
    clicking: createToggleDisplay('clicking')
}

function contract(element) {
    if (element.children[1]) {
        var isHidden = toggleBy.clicking(element.children[1])
        toggleCorners(element.children[0], isHidden)
        // element.children[0].style['border-radius'] = !isHidden ? '4px' : '4px 4px 0 0'
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

var cta = {
    hide: {
        passing: {
            suites: function(element) {
                console.log(element)
            },
            tests: function(element) {
                console.log(element)
            }
        },
        tests: function(element) {
            console.log(element)
        },
        properties: function(element) {
            console.log(element)
        }
    },

    contract: {
        suites: function(element) {
            console.log(element)
        },
        tests: function(element) {
            console.log(element)
        },
        properties: function(element) {
            console.log(element)
        }
    },
    search: {
        suites: function(value) {
            console.log(value)
        },
        tests: function(value) {
            console.log(value)
        },
        properties: function(value) {
            console.log(value)
        }
    }
}
