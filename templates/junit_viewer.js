var suites = {{{suites}}}

function contract(element) {
    if (element.children[1]) {
        var visible = element.children[1].style.display
        element.children[1].style.display = visible !== 'none' ? 'none' : 'block'
        element.children[0].style['border-radius'] = visible !== 'none' ? '4px' : '4px 4px 0 0'
    }
}

function forEachSuite(callback) {
    Object.keys(suites).forEach(function(key) {
        callback(suites[key])
    })
}

function hideSuites(element) {
    var shown = element.innerHTML.indexOf('HIDE') !== -1
    element.innerHTML = (shown ? 'SHOW' : 'HIDE') + ' PASSING SUITES'

    forEachSuite(function(suite) {
        if(suite.type === 'passed')
            document.getElementById(suite.id).style.display = shown ? 'none' : 'block'
    })
}

function hideTests(element) {

}
