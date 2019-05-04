// ==UserScript==
// @name         Agar.io feed macro
// @namespace    agar.io
// @version      0.1
// @description  agar.io w feed macro
// @author       You
// @match        https://agar.io
// @grant        none
// ==/UserScript==

(function() {
    function keydown(event) {
    // Feed Macro
    if (event.keyCode == 87 )                                        
    {
        Feed = true;
        setTimeout(mass, Speed);
    }
        function keyup(event) {
    if (event.keyCode == 87) {
        Feed = false;
    }
})();