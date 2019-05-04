// ==UserScript==
// @name         Google search results arrow key navigation
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Enable arrow key navigation through google search results
// @author       Sandro Bürki
// @include      /^https?://www\.google\.(com|ch)/search\?/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

$(document).ready(function () {
    var linkPointer = -1;
    $(document).keydown(function (e) {
        console.log(e.which);
        switch (e.which) {
            case 38: // up
                if ($('.sbhl').length) {
                    linkPointer = -1;
                    break;
                }
                linkPointer--;
                $('.r:eq(' + linkPointer + ') > a').first().focus();
                return false;
            case 40: // down
                if ($('.sbhl').length) {
                    linkPointer = -1;
                    break;
                }
                linkPointer++;
                $('.r:eq(' + linkPointer + ') > a').first().focus();
                return false;
            case 8: // backspace
                if (!$('input:focus').length) {
                    var input = $('input[name="q"]');
                    var tmp = input.val();
                    input.focus();
                    input.val('');
                    input.val(tmp);
                }
                break;
            case 13: // enter
                if ($('.sbhl').length) {
                    $('input[name="q"]').focus();
                }

        }
    });
});