// ==UserScript==
// @name        No more “Read more...”
// @description Prevent websites injecting a “Read more: www.site.com” into the copied content
// @namespace   http://superuser.com/a/708325
// @author      Robertof
// @include     *
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    var disableSelections = function() {
        document.getSelection = window.getSelection = function() {
            return { isCollapsed: true };
        };
    };
    var script = document.createElement ("script");
    script.appendChild (document.createTextNode ("(" + disableSelections + ")();"));
    (document.body || document.head || document.documentElement).appendChild (script);
})();