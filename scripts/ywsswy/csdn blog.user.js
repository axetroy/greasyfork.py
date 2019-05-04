// ==UserScript==
// @name         csdn blog
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://blog.csdn.net/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    'use strict';

$('div#asideFooter').eq(0).attr('hidden','true');
$('div.pulllog-box').eq(0).remove();
$('div.tool-box').eq(0).remove();
$('div[style^=margin-top]').eq(0).remove();
$('div#wrapper').eq(0).remove();
})();