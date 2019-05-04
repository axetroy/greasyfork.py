// ==UserScript==
// @id             Remove Amazon popups
// @name           Remove Amazon popups
// @description    Some marketing idiot at Amazon must have decided to make every link a popup.  This script prevents Amazon links from opening a new tab.
// @include        https://www.amazon.*
// @version 0.0.1
// @namespace https://greasyfork.org/users/39602
// ==/UserScript==

(function() {
    'use strict';

    [].forEach.call(document.querySelectorAll('a[target="_blank"]'),
                    function(link) {
        link.removeAttribute('target');
    });
})();