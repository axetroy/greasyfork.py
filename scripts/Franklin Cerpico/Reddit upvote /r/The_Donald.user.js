// ==UserScript==
// @name         Reddit upvote /r/The_Donald
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Upvote /r/The_Donald
// @author       You
// @match        https://www.reddit.com/r/The_Donald*
// @grant        none
// ==/UserScript==

(function() {
    $(document).ready(function() {
        setTimeout(function(){
            $('.sitetable .arrow.up').click();
        }, 500);
    });
})();