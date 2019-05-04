// ==UserScript==
// @name         JB51 Reformater
// @namespace    http://www.jb51.net/
// @version      0.1
// @description  hide everything except author information and main content.
// @author       Mianjune Hong
// @license      GPL version 3
// @match        *://www.jb51.net/article/*.htm*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var content = $('div.article-content');
    $('head').append($('<style type="text/css">.lbd, .jb51ewm{display:none!important;} .main{margin: 3em auto!important;max-width:64em;} #content{width:100%!important;}</style>')).append($('body link'));

    $('body').remove();
    $('html').append($('<body></body>').append($('<div class="main"></div>').append(content)));
})();
