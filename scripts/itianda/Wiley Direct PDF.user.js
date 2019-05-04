// ==UserScript==
// @name         Wiley Direct PDF
// @namespace    http://itianda.com/
// @version      0.2
// @description  Download PDF from Wiley Online Library directly (not via ReadCube).
// @author       itianda
// @match        *://onlinelibrary.wiley.com/doi/epdf/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var url = window.location.href;
    var newUrl = url.replace(/epdf/, 'pdf');
    window.location.href = newUrl;
})();