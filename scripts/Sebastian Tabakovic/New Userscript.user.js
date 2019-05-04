// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.random.org/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        var setResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, ],
            count = 0,
            iframe = document.getElementById('homepage-generator').getElementsByTagName('IFRAME')[0],
            iframeDocument = iframe.contentDocument || iframe.contentWindow.document,
            generator = iframeDocument.getElementById('true-random-integer-generator-button'),
            result = iframeDocument.getElementById('true-random-integer-generator-result');

        generator.removeAttribute('onclick');
        generator.onclick = function() {
            var n = count++;
            if (n >= setResult.length) return;
            result.innerHTML = '<img src="/util/cp/images/ajax-loader.gif" alt="Loading..." />';
            setTimeout(function() {
                result.innerHTML = setResult[n];
            }, ((Math.floor(Math.random() * 4) + 2) * 100));
        };
        console.log("random init")
    }, 1500);
})();