// ==UserScript==
// @name         Rep Char Limit Bypasser
// @namespace    http://www.fuckboygamers.club
// @version      2.0
// @description  Bypass the character limit for giving people rep.
// @author       Mr Whiskey
// @match        https://hackforums.net/reputation.php?action=*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

$(".button").click(function() {
    var txt = $('.textbox').val();
    if(txt.length >= 10)
    {
        // Do nothing
    }
    else
    {
    $( '.textbox' ).val(txt + "            ");
    }
});