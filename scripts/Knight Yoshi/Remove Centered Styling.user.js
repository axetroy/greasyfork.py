// ==UserScript==
// @name         Remove Centered Styling
// @namespace    gaiaupgrade
// @version      0.2
// @description  Remove Gaia's centered stylesheet
// @locale       EN
// @author       Knight Yoshi
// @match        http://www.gaiaonline.com/*
// @grant        none
// ==/UserScript==

(function() {
    var centerStyle = document.querySelector('link[href$="core2_centered.css"]');
    if(centerStyle !== null) {
        centerStyle.remove();
    }
})();