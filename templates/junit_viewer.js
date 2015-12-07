var suites = {{{suites}}}

var names = Object.keys(suites).map(function(key) {
    var tests = suites[key].tests.map(function(test) {
        return {
            name: test.name.toLowerCase(),
            id: test.id
        }
    })
    return {
        suite: {
            name: suites[key].name.toLowerCase(),
            id: suites[key].id
        },
        tests: tests
    }
})

function search(value) {
    if (value === '') {
        names.forEach(function(name) {
            document.getElementById(name.suite.id).style.display = 'block'
        })
    } else {
        value = value.toLowerCase()
        names.filter(function(name) {
            return name.suite.name.indexOf(value) === -1
        }).forEach(function(name) {
            document.getElementById(name.suite.id).style.display = 'none'
        })

        names.filter(function(name) {
            return name.suite.name.indexOf(value) !== -1
        }).forEach(function(name) {
            document.getElementById(name.suite.id).style.display = 'block'
        })
    }
}
