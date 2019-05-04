// ==UserScript==
// @name         Prevent Fimfiction 4.0 Paragraph Selection
// @namespace    https://www.fimfiction.net/user/29560/Device+Null
// @version      1.0
// @description  Prevents the paragraph selection menu from appearing when clicking on text in stories.
// @author       Device Null
// @match        https://www.fimfiction.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var cl = mutation.target.classList;
            if (cl.contains('showing')) {
                cl.remove('showing');
            }
        });
    });

    observer.observe(document.querySelector('#paragraph-options'), { attributes: true });
})();