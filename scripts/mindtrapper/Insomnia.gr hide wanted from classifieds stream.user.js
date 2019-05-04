// ==UserScript==
// @name           Insomnia.gr hide wanted from classifieds stream
// @namespace      mindtrapper (Thanks to Blazemonger https://stackoverflow.com/a/8301733)
// @description    Hides wanted from classifieds stream, showing only selling.
// @match        https://www.insomnia.gr/discover/*
// @include        https://www.insomnia.gr/discover/*
// @version 	   1.1
// ==/UserScript==

window.addEventListener('wheel', function() {

        var p = document.getElementsByClassName('ipsBadge ipsBadge_style2');
var cstr = "ipsPad";
for (var i=p.length; --i>=0;) {
    var n = p[i];
    while(n.className.split(" ").indexOf(cstr)==-1) { // won't work in older browsers
        n = n.parentNode;
    }
    n.parentNode.removeChild(n);
}
}, true);