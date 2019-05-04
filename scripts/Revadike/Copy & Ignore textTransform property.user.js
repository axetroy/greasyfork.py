// ==UserScript==
// @name         Copy & Ignore textTransform property
// @namespace    Royalgamer06
// @version      1.1.0
// @description  Ignore the textTransform property while copying some text.
// @author       Royalgamer06 <https://royalgamer06.ga>
// @include      *
// @run-at       document-start
// @grant        none
// ==/UserScript==

// ==Code==
document.addEventListener("copy", function(e) {
    e.target.style.textTransform = "none";
    setTimeout(function() {
        e.target.style.textTransform  = "";
    }, 1);
});
// ==/Code==