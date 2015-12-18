function toggleContraction(element) {
    var suiteButton = element.children[0]
    var suiteContent = element.children[1]
    var isContracted = suiteContent.className.indexOf('contracted') !== -1

    if (isContracted) {
        suiteButton.className = suiteButton.className.replace('round', 'flat')
        suiteContent.className = suiteContent.className.replace(' contracted', '')
    } else {
        suiteButton.className = suiteButton.className.replace('flat', 'round')
        suiteContent.className = suiteContent.className + ' contracted'
    }
}

function toggleHidden(element) {
    var isHidden = element.className.indexOf('hidden') !== -1

    if (isHidden) {
        element.className = element.className.replace(' hidden', '')
    } else {
        element.className = element.className + ' hidden'
    }
}

function contractSuites(button) {
    var isContracted = button.innerHTML.indexOf('EXPAND') !== -1
    button.innerHTML = isContracted ? 'CONTRACT ALL' : 'EXPAND ALL'

    suites.forEach(function(suite) {
        var suiteElement = document.getElementById(suite.id)
        var suiteButton = suiteElement.children[0]
        var suiteContent = suiteElement.children[1]

        if (isContracted) {
            suiteButton.className = suiteButton.className.replace('round', 'flat')
            suiteContent.className = suiteContent.className.replace(' contracted', '')
        } else {
            suiteButton.className = suiteButton.className.replace('flat', 'round')
            suiteContent.className = suiteContent.className + ' contracted'
        }
    })
}

function hidePassingSuites(button) {
    var isHidden = button.innerHTML.indexOf('SHOW') !== -1
    button.innerHTML = isHidden ? 'HIDE PASSING' : 'SHOW PASSING'

    suites.forEach(function(suite) {
        var suiteElement = document.getElementById(suite.id)
        if (isHidden)
            suiteElement.className = suiteElement.className.replace(' hidden', '')
        else if (suite.type === 'passed')
            suiteElement.className = 'suite hidden'
    })
}

function searchSuites(value) {
    value = value.toUpperCase()
    suites.forEach(function(suite) {
        var suiteElement = document.getElementById(suite.id)
        var inSearch = suite.name.toUpperCase().indexOf(value) !== -1
        var notAlreadySearched = suiteElement.className.indexOf('not_in_search') === -1
        if (!inSearch && notAlreadySearched) {
            suiteElement.className = suiteElement.className + ' not_in_search'
        }

        if (inSearch) {
            suiteElement.className = suiteElement.className.replace(' not_in_search', '')
        }
    })
}
