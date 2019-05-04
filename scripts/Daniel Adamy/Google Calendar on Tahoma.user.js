// ==UserScript==
// @name         Google Calendar on Tahoma
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  see name
// @author       csapdani
// @match        https://calendar.google.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @run-at       document-body
// ==/UserScript==

(function($) {
    'use strict';
   var style = "body, button, input, label, select, td, textarea { " +
       "font-family: Tahoma;" +
       "}";
    var styleDom = $('<style type="text/css"></style>');
    styleDom.text(style);
    $('body').append(styleDom);
    
})(jQuery);