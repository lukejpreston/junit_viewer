function addClass(element, className) {
    if (element)
        element.className = element.className + ' ' + className
}

function removeClass(element, className) {
    if (element)
        element.className = element.className.replace(' ' + className, '')
}

function replaceClass(element, fromClassName, toClassName) {
    if (element)
        element.className = element.className.replace(fromClassName, toClassName)
}

function toggleContraction(element) {
    var suiteButton = element.children[0]
    var suiteContent = element.children[1]
    if (!suiteContent) {
        return
    }
    var isContracted = suiteContent.className.indexOf('contracted') !== -1

    if (isContracted) {
        replaceClass(suiteButton, 'round', 'flat')
        removeClass(suiteContent, 'contracted')
    } else {
        replaceClass(suiteButton, 'flat', 'round')
        addClass(suiteContent, 'contracted')
    }
}

function createVisibleInfo(suites) {
    var data = {
        suites: {},
        tests: {}
    }
    Object.keys(suites).filter(function(suiteKey) {
        var suite = document.getElementById(suiteKey)
        return suite !== null
    }).forEach(function(suiteKey, index) {
        var suite = document.getElementById(suiteKey)
        if (suite.className.indexOf('not_in_search') === -1 &&
            suite.className.indexOf('hidden') === -1 &&
            suite.className.indexOf('no_visible_tests') === -1) {
            var type = suite.children[0].className.split(' ')[0].split('--')[1]
            if (!data.suites.hasOwnProperty(type))
                data.suites[type] = 0
            data.suites[type] += 1
            var suiteContents = suite.children[1].children
            Object.keys(suiteContents).filter(function(testKey) {
                return document.getElementById(testKey) !== null &&
                    suiteContents[testKey].className.indexOf('test') !== -1 &&
                    suiteContents[testKey].className.indexOf('not_in_search') === -1 &&
                    suiteContents[testKey].className.indexOf('hidden') === -1
            }).forEach(function(testKey) {
                var test = document.getElementById(testKey)
                var type = test.children[0].className.split(' ')[1].split('--')[1]
                if (!data.tests.hasOwnProperty(type))
                    data.tests[type] = 0
                data.tests[type] += 1
            })
        }
    })

    return data
}

function updateInfo() {
    var suites = document.getElementsByClassName('suite')
    var data = createVisibleInfo(suites)

    var hiddenSuites = document.getElementsByClassName('suite hidden')
    var notInSearchSuites = document.getElementsByClassName('suite not_in_search')
    var noVisibleTestsSuites = document.getElementsByClassName('suite no_visible_tests')
    data.suites.count = suites.length - hiddenSuites.length - notInSearchSuites.length - noVisibleTestsSuites.length

    var tests = document.getElementsByClassName('test')
    var hiddenTests = document.getElementsByClassName('test hidden')
    var notInSearchTests = document.getElementsByClassName('test not_in_search')

    data.tests.count = 0
    Object.keys(data.tests).filter(function(key) {
        return key !== 'count'
    }).forEach(function(key) {
        data.tests.count += data.tests[key]
    })

    Object.keys(junit_info.suites).forEach(function(key) {
        if (data.suites.hasOwnProperty(key))
            document.getElementById('junit_info_suite_' + key + '_count').innerHTML = data.suites[key]
        else
            document.getElementById('junit_info_suite_' + key + '_count').innerHTML = 0
    })

    Object.keys(junit_info.tests).forEach(function(key) {
        if (data.tests.hasOwnProperty(key))
            document.getElementById('junit_info_test_' + key + '_count').innerHTML = data.tests[key]
        else
            document.getElementById('junit_info_test_' + key + '_count').innerHTML = 0
    })
}

// SUITES

function contractSuites(button) {
    var isContracted = button.innerHTML.indexOf('EXPAND') !== -1
    button.innerHTML = isContracted ? 'CONTRACT ALL' : 'EXPAND ALL'

    suites.forEach(function(suite) {
        var suiteElement = document.getElementById(suite.id)
        var suiteButton = suiteElement.children[0]
        var suiteContent = suiteElement.children[1]

        if (isContracted) {
            replaceClass(suiteButton, 'round', 'flat')
            removeClass(suiteContent, 'contracted')
        } else {
            replaceClass(suiteButton, 'flat', 'round')
            addClass(suiteContent, 'contracted')
        }
    })
}

function setContracted(contracted) {

 if(contracted==="contracted")
 {

    document.getElementById('contractSuits').innerHTML="EXPAND ALL";

 }
else{

    document.getElementById('contractSuits').innerHTML="CONTRACT ALL";
}

    console.log("Log this"+contracted);

}

function hidePassingSuites(button) {
    var isHidden = button.innerHTML.indexOf('SHOW') !== -1
    button.innerHTML = isHidden ? 'HIDE PASSING' : 'SHOW PASSING'

    suites.forEach(function(suite) {
        var suiteElement = document.getElementById(suite.id)
        if (isHidden)
            removeClass(suiteElement, 'hidden')
        else if (suite.type === 'passed')
            addClass(suiteElement, 'hidden')
    })

    updateInfo()
}

function globToRegex(pat) {
    var i = 0,
        j, n = pat.length || 0,
        res, c, stuff
    res = '^';
    while (i < n) {
        c = pat[i];
        i = i + 1;
        if (c === '*') {
            res = res + '.*';
        } else if (c === '?') {
            res = res + '.';
        } else if (c === '[') {
            j = i;
            if (j < n && pat[j] === '!') {
                j = j + 1;
            }
            if (j < n && pat[j] === ']') {
                j = j + 1;
            }
            while (j < n && pat[j] !== ']') {
                j = j + 1;
            }
            if (j >= n) {
                res = res + '\\[';
            } else {
                stuff = pat.slice(i, j).replace('\\', '\\\\');
                i = j + 1;
                if (stuff[0] === '!') {
                    stuff = '^' + stuff.slice(1);
                } else if (stuff[0] === '^') {
                    stuff = '\\' + stuff;
                }
                res = res + '[' + stuff + ']';
            }
        } else {
            res = res + escape(c);
        }
    }
    return res + '$';
}

function match(search, text) {
    text = text.toUpperCase()
    search = search.toUpperCase()

    if (text.indexOf(search) !== -1) return true

    try {
        if (text.match(new RegExp(search)) !== null) return true
    } catch (e) {}

    try {
        if (text.match(new RegExp(globToRegex(search))) !== null) return true
    } catch (e) {}

    var j = -1
    for (var i = 0; i < search.length; i++) {
        var l = search[i]
        if (l == ' ') continue
        j = text.indexOf(l, j + 1)
        if (j == -1) return false
    }
    return true
}

function searchSuites(value) {
    value = value.toUpperCase()
    suites.forEach(function(suite) {
        var suiteElement = document.getElementById(suite.id)
        if (value === '') {
            removeClass(suiteElement, 'not_in_search')
            return
        }

        var inSearch = match(value, suite.name)
        var notAlreadySearched = suiteElement.className.indexOf('not_in_search') === -1
        if (!inSearch && notAlreadySearched)
            addClass(suiteElement, 'not_in_search')
        if (inSearch)
            removeClass(suiteElement, 'not_in_search')
    })

    updateInfo()
}

// TESTS

function forEachTest(callback) {
    suites.forEach(function(suite) {
        suite.testCases.forEach(callback)
    })
}

function contractTests(button) {
    var isContracted = button.innerHTML.indexOf('EXPAND') !== -1
    button.innerHTML = isContracted ? 'CONTRACT ALL' : 'EXPAND ALL'
    forEachTest(function(test) {
        var testElement = document.getElementById(test.id)
        var testButton = testElement.children[0]
        var testContent = testElement.children[1]

        if (isContracted) {
            replaceClass(testButton, 'round', 'flat')
            removeClass(testContent, 'contracted')
        } else {
            replaceClass(testButton, 'flat', 'round')
            addClass(testContent, 'contracted')
        }
    })
}

function hideTests(button) {
    var isHidden = button.innerHTML.indexOf('SHOW') !== -1
    button.innerHTML = isHidden ? 'HIDE ALL' : 'SHOW ALL'
    forEachTest(function(test) {
        var testElement = document.getElementById(test.id)
        if (isHidden)
            removeClass(testElement, 'hidden')
        else
            addClass(testElement, 'hidden')
    })

    updateInfo()
}

function hidePassingTests(button) {
    var isHidden = button.innerHTML.indexOf('SHOW') !== -1
    button.innerHTML = isHidden ? 'HIDE PASSING' : 'SHOW PASSING'
    forEachTest(function(test) {
        var testElement = document.getElementById(test.id)
        if (isHidden)
            removeClass(testElement, 'hidden')
        else if (test.type === 'passed')
            addClass(testElement, 'hidden')
    })

    updateInfo()
}

function searchTests(value) {
    value = value.toUpperCase()
    forEachTest(function(test) {
        var testElement = document.getElementById(test.id)
        if (value === '') {
            removeClass(testElement, 'not_in_search')
            suites.forEach(function(suite) {
                var suiteElement = document.getElementById(suite.id)
                suiteElement.className = suiteElement.className.replace(' no_visible_tests', '')
            })
            return
        }

        var inSearch = match(value, test.name)
        test.messages.values.forEach(function(message) {
            var isInMessage = match(value, message.value)
            if (isInMessage)
                inSearch = true
        })

        var notAlreadySearched = testElement.className.indexOf('not_in_search') === -1
        if (!inSearch && notAlreadySearched)
            addClass(testElement, 'not_in_search')
        if (inSearch)
            removeClass(testElement, 'not_in_search')
    })

    suites.forEach(function(suite) {
        var suiteElement = document.getElementById(suite.id)
        var testElements = suiteElement.children[1].children
        var numberOfHiddenTests = Object.keys(testElements).filter(function(key) {
            return document.getElementById(key) !== null && (testElements[key].className.indexOf('not_in_search') !== -1 || testElements[key].className.indexOf('properties') !== -1)
        }).length

        if (testElements.length === numberOfHiddenTests)
            suiteElement.className = suiteElement.className + ' no_visible_tests'
        else
            suiteElement.className = suiteElement.className.replace(' no_visible_tests', '')
    })

    updateInfo()
}

// Properties

function contractProperties(button) {
    var isContracted = button.innerHTML.indexOf('EXPAND') !== -1
    button.innerHTML = isContracted ? 'CONTRACT ALL' : 'EXPAND ALL'

    suites
        .filter(function(suite) {
            return suite.properties.values.length > 0
        })
        .forEach(function(suite) {
            var propertiesElement = document.getElementById(suite.properties.id)
            var propertiesButton = propertiesElement.children[0]
            var propertiesContent = propertiesElement.children[1]

            if (isContracted) {
                replaceClass(propertiesButton, 'round', 'flat')
                removeClass(propertiesContent, 'contracted')
            } else {
                replaceClass(propertiesButton, 'flat', 'round')
                addClass(propertiesContent, 'contracted')
            }
        })
}

function hideProperties(button) {
    var isHidden = button.innerHTML.indexOf('SHOW') !== -1
    button.innerHTML = isHidden ? 'HIDE ALL' : 'SHOW ALL'
    suites
        .filter(function(suite) {
            return suite.properties.values.length > 0
        })
        .forEach(function(suite) {
            var propertiesElement = document.getElementById(suite.properties.id)
            if (isHidden)
                removeClass(propertiesElement, 'hidden')
            else
                addClass(propertiesElement, 'hidden')
        })
}

function searchProperties(value) {
    value = value.toUpperCase()
    suites.forEach(function(suite) {
        suite.properties.values.forEach(function(property) {
            var propertyElement = document.getElementById(property.id)
            if (value === '') {
                removeClass(propertyElement, 'not_in_search')
                return
            }

            var inSearch = match(value, property.name) || match(value, property.value)
            var notAlreadySearched = propertyElement.className.indexOf('not_in_search') === -1
            if (!inSearch && notAlreadySearched)
                addClass(propertyElement, 'not_in_search')
            if (inSearch)
                removeClass(propertyElement, 'not_in_search')

        })
    })
}

function showOptions() {
    var collapsed = document.getElementById('optionsCollapsed')
    collapsed.style.display = "none"

    var expanded = document.getElementById('optionsExpanded')
    expanded.style.display = "block"

    var optionsContainer = document.getElementById('options_container')
    optionsContainer.className = optionsContainer.className.replace('one', 'one-third')

    var suitesContainer = document.getElementById('suites_container')
    suitesContainer.className = suitesContainer.className.replace('eleven ', 'two-thirds ')
    suitesContainer.className = suitesContainer.className.replace('columns ', 'column ')
}

function hideOptions() {
    var collapsed = document.getElementById('optionsCollapsed')
    collapsed.style.display = "block"

    var expanded = document.getElementById('optionsExpanded')
    expanded.style.display = "none"

    var optionsContainer = document.getElementById('options_container')
    optionsContainer.className = optionsContainer.className.replace('one-third', 'one')

    var suitesContainer = document.getElementById('suites_container')
    suitesContainer.className = suitesContainer.className.replace('two-thirds ', 'eleven ')
    suitesContainer.className = suitesContainer.className.replace('column ', 'columns ')
}

var height = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
document.getElementById('suites_container').style['height'] = height + 'px'
document.getElementById('options').style['height'] = (height - 38 * 2) + 'px'

window.onresize = function(event) {
    var height = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
    document.getElementById('suites_container').style['height'] = height + 'px'
    document.getElementById('options').style['height'] = (height - 38 * 2) + 'px'
}


