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
    global_hide_passing: createToggleDisplay('global_hide_passing'),
    global_hide_all: createToggleDisplay('global_hide_all'),
    local: createToggleDisplay('local'),
    global: createToggleDisplay('global')
}

function contract(element, by) {
    if (element.children[1]) {
        var isHidden = toggleBy[by](element.children[1])
        toggleCorners(element.children[0], isHidden)
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

function forEachProperties(callback) {
    forEachSuite(function(suite) {
        if (suite.properties)
            callback(suite.properties, suite)
    })
}

var cta = {
    hide: {
        passing: {
            suites: function(element) {
                var isHidden = element.innerHTML.indexOf('HIDE') !== -1
                element.innerHTML = (isHidden ? 'SHOW' : 'HIDE') + ' PASSING'
                forEachSuite(function(suite) {
                    if (suite.type === 'passed') {
                        var suiteElement = document.getElementById(suite.id)
                        toggleBy.global_hide_passing(suiteElement);
                    }
                })
            },
            tests: function(element) {
                var isHidden = element.innerHTML.indexOf('HIDE') !== -1
                element.innerHTML = (isHidden ? 'SHOW' : 'HIDE') + ' PASSING'
                forEachTest(function(test) {
                    if (test.type === 'passed') {
                        var testElement = document.getElementById(test.id)
                        toggleBy.global_hide_passing(testElement);
                    }
                })
            }
        },
        tests: function(element) {
            var isHidden = element.innerHTML.indexOf('HIDE') !== -1
            element.innerHTML = (isHidden ? 'SHOW' : 'HIDE') + ' ALL'
            forEachTest(function(test) {
                var testElement = document.getElementById(test.id)
                toggleBy.global_hide_all(testElement);
            })
        },
        properties: function(element) {
            var isHidden = element.innerHTML.indexOf('HIDE') !== -1
            element.innerHTML = (isHidden ? 'SHOW' : 'HIDE') + ' ALL'
            forEachProperties(function(properties) {
                var propertiesElement = document.getElementById(properties.id)
                toggleBy.global_hide_all(propertiesElement);
            })
        }
    },

    contract: {
        local: {
            suite: function(element) {
                contract(element, 'local')
            },
            test: function(element) {
                contract(element, 'local')
            },
            properties: function(element) {
                contract(element, 'local')
            },
            option: function(element) {
                contract(element, 'local')
            }
        },
        global: {
            suites: function(element) {
                var isHidden = element.innerHTML.indexOf('CONTRACT') !== -1
                element.innerHTML = (isHidden ? 'EXPAND' : 'CONTRACT') + ' ALL'
                forEachSuite(function(suite) {
                    var suiteElement = document.getElementById(suite.id)
                    contract(suiteElement, 'global')
                })
            },
            tests: function(element) {
                var isHidden = element.innerHTML.indexOf('CONTRACT') !== -1
                element.innerHTML = (isHidden ? 'EXPAND' : 'CONTRACT') + ' ALL'
                forEachTest(function(test) {
                    var testElement = document.getElementById(test.id)
                    contract(testElement, 'global')
                })
            },
            properties: function(element) {
                var isHidden = element.innerHTML.indexOf('CONTRACT') !== -1
                element.innerHTML = (isHidden ? 'EXPAND' : 'CONTRACT') + ' ALL'
                forEachProperties(function(properties) {
                    var propertiesElement = document.getElementById(properties.id)
                    contract(propertiesElement, 'global')
                })
            }
        }
    },
    search: {
        suites: function(value) {
            value = value.toUpperCase()
            forEachSuite(function(suite) {
                var suiteElement = document.getElementById(suite.id)
                var isNotHidden = suiteElement.className.indexOf('hide--searching') === -1
                if (value === '')
                    suiteElement.className = suiteElement.className.replace(' hide--searching', '')
                else if (suite.name.toUpperCase().indexOf(value) !== -1)
                    suiteElement.className = suiteElement.className.replace(' hide--searching', '')
                else if (isNotHidden)
                    suiteElement.className = suiteElement.className + ' hide--searching'

            })
        },
        tests: function(value) {
            console.log(value)
        },
        properties: function(value) {
            console.log(value)
        }
    }
}
