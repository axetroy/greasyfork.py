// ==UserScript==
// @name         Reddit downvote /r/The_Donald
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Downvote /r/The_Donald
// @author       You
// @match        https://www.reddit.com/r/The_Donald*
// @grant        none
// ==/UserScript==

(function() {
    $(document).ready(function() {
        setTimeout(function(){
            $('.sitetable .arrow.down').click();
            setTimeout(function() {
                location.reload();
            }, 5000);
        }, 5000);
    });
})();