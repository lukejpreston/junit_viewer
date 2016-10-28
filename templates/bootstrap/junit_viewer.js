function addClass(element, className) {
    if (element)
        element.className = element.className + ' ' + className
}

function removeClass(element, className) {
    if (element)
        element.className = element.className.replace(' ' + className, '')
}

function hasClass(element, className) {
    if (element) {
        return element.className.indexOf(className) >= 0
    }
    return false;
}

function replaceClass(element, fromClassName, toClassName) {
    if (element)
        element.className = element.className.replace(fromClassName, toClassName)
}

function addEventListernerByClassName(className, event, callback) {
    var els = document.getElementsByClassName(className);
    for (var i = 0; i < els.length; i++) {
        els[i].addEventListener(event, callback, false);
    }
}

addEventListernerByClassName('bt-expand', 'click', function (e) {
    var els = document.getElementsByClassName('suite-contents');
    for (var i = 0; i < els.length; i++) {
        removeClass(els[i], 'hide');
    }

    var els = document.getElementsByClassName('bt-detail');
    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = '-';
    }
    
    e.preventDefault();
});

addEventListernerByClassName('bt-contract', 'click', function (e) {
    var els = document.getElementsByClassName('suite-contents');
    for (var i = 0; i < els.length; i++) {
        addClass(els[i], 'hide');
    }

    var els = document.getElementsByClassName('bt-detail');
    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = '+';
    }
    
    e.preventDefault();
});

addEventListernerByClassName('bt-detail', 'click', function (e) {
    var els = this.parentElement.getElementsByClassName('suite-contents');
    for (var i = 0; i < els.length; i++) {
        if (hasClass(els[i], 'hide')) {
            removeClass(els[i], 'hide');
            this.innerHTML = '-';
        } else {
            addClass(els[i], 'hide');
            this.innerHTML = '+';
        }
    }
    
    e.preventDefault();
});

addEventListernerByClassName('bt-filter', 'click', function (e) {
    var els = document.getElementsByClassName('bt-filter');
    for (var i = 0; i < els.length; i++) {
        if (els[i] == this) {
            replaceClass(this, 'btn-default', 'btn-primary');
        } else {
            replaceClass(els[i], 'btn-primary', 'btn-default');
        }
    }

    var filterClass = this.dataset.filter;
    var els = document.getElementsByClassName('suite');
    for (var i = 0; i < els.length; i++) {
        if (hasClass(els[i], filterClass)) {
            removeClass(els[i], 'hide');
        } else {
            addClass(els[i], 'hide');
        }
    }
    e.preventDefault();
});
