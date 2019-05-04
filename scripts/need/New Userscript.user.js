// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://dmeden.net/comichtml/*
// @grant        none
// @require http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

(function() {
    'use strict';
$("#iBody img").width("100%").on('click touch', function () {
$( "#btnPageNext" ).trigger( "click" )
});
$("#btnPageNext").css(
    {
    "position": "absolute",
    "right": "-30px",
    "height": "100%",
    "width": "33px"
});


    // Your code here...
})();