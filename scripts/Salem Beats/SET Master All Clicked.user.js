// ==UserScript==
// @name         SET Master All Clicked
// @namespace    Cuyler
// @version      0.7
// @description  Click all set masters by default.
// @author       Cuyler
// @include      file:///C:/Users/salem/Desktop/setclickableframe.html
// @include      *
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// @icon         http://ez-link.us/sb-png
// ==/UserScript==

(function() {
    var setMasterLogo = document.querySelector("a[href='http://www.set.tv/']");

    if(setMasterLogo)
    {
        setTimeout(function() {
            jQuery(".bounding-box").click();
        },0);
    }
})();