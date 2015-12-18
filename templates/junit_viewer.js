function toggleContraction(element) {
    var button = element.children[0]

    var suiteContent = element.children[1]
    var isContracted = suiteContent.className.indexOf('contracted') !== -1

    if (isContracted) {
        button.className = button.className.replace('round', 'flat')
        suiteContent.className = suiteContent.className.replace(' contracted', '')
    } else {
        button.className = button.className.replace('flat', 'round')
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
