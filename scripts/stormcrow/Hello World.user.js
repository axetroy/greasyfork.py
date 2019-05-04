// ==UserScript==
// @name         Hello World
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Simple attempt to test the skills
// @author       Stormcorw
// @match        */temp.html
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==
$("document").ready(function() {
    'use strict';

    // Your code here
    var $input = $('<input value="Bazinga" type="submit"/>');
    $input.appendTo($("center"));
})();