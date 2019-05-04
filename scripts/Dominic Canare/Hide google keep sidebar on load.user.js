// ==UserScript==
// @name         Hide google keep sidebar on load
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dominic Canare <dom@greenlightgo.org>
// @match        https://keep.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var path = '//div[@aria-label="Main menu"]';
    var matchIterator = document.evaluate(path, document.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var node = matchIterator.iterateNext();
    node.click();
    
})();