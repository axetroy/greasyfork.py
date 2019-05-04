// ==UserScript==
// @name         Enough of Donald Drumpf!
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Downvote /r/The_Donald
// @author       You
// @match        https://www.reddit.com/r/hillaryclinton*
// @grant        none
// ==/UserScript==

(function() {
    $(document).ready(function() {
        setTimeout(function(){
            $('.sitetable .arrow.down').click();
        }, 500);
    });
})();