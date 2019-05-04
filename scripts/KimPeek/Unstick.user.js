// ==UserScript==
// @name         Unstick
// @name:en      Unstick
// @namespace    https://github.com/kimpeek/Unstick
// @version      0.2
// @description  Make fixed-position elements scroll with the page.
// @author       kimpeek
// @include      *
// @grant        none
// @icon         https://raw.githubusercontent.com/kimpeek/Unstick/master/Down.ico
// ==/UserScript==

(function() {

    const elements = document.querySelectorAll('body *');

    for (let element of elements) {
        if (getComputedStyle(element).position === 'fixed') {
            element.style.position = "absolute";
        }
        else if (getComputedStyle(element).position === 'sticky') {
            element.style.position = "relative";
        }
    }
})();
