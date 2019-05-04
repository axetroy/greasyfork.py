// ==UserScript==
// @name         Boring Font Replacer
// @description  Replace all instances of Verdana, Arial, Helvetica, Tahoma, Trebuchet and Lucida Grande/Sans with Open Sans (or any other system/Google font)
// @version      0.3
// @author       mica
// @namespace    greasyfork.org/users/12559
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() { // ↓ Enter your font here (system-installed or from google.com/fonts)
    var font = 'Open Sans'; // If using a system font, comment out the next line ↓
    GM_addStyle('@import "https://fonts.googleapis.com/css?family=' + font.replace(/\s/g,'+') + '"');
    document.addEventListener('DOMContentLoaded', function() {
        var elem = document.body.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var fonts = window.getComputedStyle(elem[i]).getPropertyValue('font-family');
            if (
                fonts.match(/^(")*sans-serif/i) || // Comment out this line if you've already set up your browser's default for sans-serif; some sites use this alone as their main font-family (e.g. Wikipedia)
                fonts.match(/^(")*verdana/i) ||
                fonts.match(/^(")*arial/i) ||
                fonts.match(/^(")*helvetica/i) ||
                fonts.match(/^(")*tahoma/i) ||
                fonts.match(/^(")*trebuchet/i) ||
                fonts.match(/^(")*lucida grande/i) ||
                fonts.match(/^(")*lucida sans/i)
                ) {
                elem[i].style.fontFamily = '"' + font + '", ' + fonts;
            }
        }
    });
})();
