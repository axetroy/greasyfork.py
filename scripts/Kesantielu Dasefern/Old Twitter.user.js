// ==UserScript==
// @name         Old Twitter
// @name:ru      Старый Twitter
// @namespace    https://dasefern.com/
// @version      1.0
// @description  Say NO to circles!
// @description:ru Долой круглые аватарки!
// @author       Kesantielu Dasefern
// @match        *://twitter.com/*
// ==/UserScript==

function removeEdge() {
    document.body.classList.remove('edge-design');
}

(function() {
    'use strict';
    var observer = new MutationObserver(function(m) {
        removeEdge();
    });
    observer.observe(document.body, { attributes: true});
})();