// ==UserScript==
// @run-at document-start
// @name         prntscr direct link
// @version      0.1
// @description  link direct to image link
// @author       Ewart Boonstra
// @match        http://prnt.sc/*
// @require http://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/97631
// ==/UserScript==

(function() {
    'use strict';
     //var url = $('.image-framed').attr("src");
    var metaUrl = $('head').find('meta[name="twitter:image:src"]')[0];
    var url = $(metaUrl).attr('content');
    console.log(url);
    window.location.href = url;
})();