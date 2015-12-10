// var suites = {{{suites}}}

function contract(element) {
    if (element.children[1]) {
        var visible = element.children[1].style.display
        element.children[1].style.display = visible !== 'none' ? 'none' : 'block'
        element.children[0].style['border-radius'] = visible !== 'none' ? '4px' : '4px 4px 0 0'
    }
}
