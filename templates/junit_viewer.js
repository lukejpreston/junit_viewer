function addClass(element, className) {
    element.className = element.className + ' ' + className
}

function removeClass(element, className) {
    element.className = element.className.replace(' ' + className, '')
}

function replaceClass(element, fromClassName, toClassName) {
    element.className = element.className.replace(fromClassName, toClassName)
}

function toggleContraction(element) {
    var suiteButton = element.children[0]
    var suiteContent = element.children[1]
    var isContracted = suiteContent.className.indexOf('contracted') !== -1

    if (isContracted) {
        replaceClass(suiteButton, 'round', 'flat')
        removeClass(suiteContent, 'contracted')
    } else {
        replaceClass(suiteButton, 'flat', 'round')
        addClass(suiteContent, 'contracted')
    }
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
}

function searchSuites(value) {
    value = value.toUpperCase()
    suites.forEach(function(suite) {
        var suiteElement = document.getElementById(suite.id)
        var inSearch = suite.name.toUpperCase().indexOf(value) !== -1
        var notAlreadySearched = suiteElement.className.indexOf('not_in_search') === -1
        if (!inSearch && notAlreadySearched)
            addClass(suiteElement, 'not_in_search')
        if (inSearch)
            removeClass(suiteElement, 'not_in_search')
    })
}

// TESTS

function forEachTest(callback) {
    suites.forEach(function(suite) {
        suite.testCases.forEach(callback)
    })
}

function hideTests(button) {
    var isHidden = button.innerHTML.indexOf('SHOW') !== -1
    button.innerHTML = isHidden ? 'HIDE ALL' : 'SHOW ALL'

    forEachTest(function(test) {
        var testElement = document.getElementById(test.id)

        if (isHidden) {

        }
    })
}

function contractTests(button) {

}

function hidePassingTests(button) {

}

function searchTests(value) {

}
