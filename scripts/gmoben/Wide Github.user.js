// ==UserScript==
// @name     Wide Github
// @description expand the UI to fill the window
// @version  1
// @natch    http*://*.github.com/** http*://github.*.*.*/**
// @grant    GM_addStyle
// @namespace https://greasyfork.org/users/177979
// ==/UserScript==



(function() {
    'use strict';

    function GM_addStyle_from_string(str) {
        var node = document.createElement('style');
        node.innerHTML = str;
        document.body.appendChild(node);
    }

    //var cssSrc = GM_getResourceText ("readableWikipediaCss");

    var cssSrc = `
#page-content {
	width: auto !important;
	margin-left: 1em !important;
	margin-right: 1em !important;
}`;

    GM_addStyle_from_string(cssSrc);
})();