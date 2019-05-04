// ==UserScript==
// @name         EPICGAMES infinite name-change
// @description EPICGAMES infinite name-change.
// @namespace    http://tampermonkey.net/
// @match       https://www.epicgames.com/account/personal
// @version 1.0.0
// ==/UserScript==

(function() {
    var plsjustremovedisabled = setInterval(function() {
        try {
            document.getElementsByClassName("displayName")[0].removeAttribute("disabled");
        } catch (e) {
            if (!e) {
                console.log("Allowed to change name");
                clearInterval(plsjustremovedisabled);
            }
        }
    }, 100);
})();