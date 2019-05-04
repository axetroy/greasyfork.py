// ==UserScript==
// @name          Google Real Link
// @description   remove onmousedown attribute of all links on google search
// @author        JaHIY
// @namespace     JaHIY
// @match         https://www.google.com/search?*
// @version       0.1
// @homepageURL   https://greasyfork.org/scripts/5065
// @run-at        document-end
// ==/UserScript==

'use strict';

Array.filter(document.getElementsByTagName('a'), function(e) {
        return e.hasAttribute('onmousedown');
    }).forEach(function(e) {
        e.removeAttribute('onmousedown');
});