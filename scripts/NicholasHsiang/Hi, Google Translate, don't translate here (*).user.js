// ==UserScript==
// @name         Hi, Google Translate, don't translate here (*)
// @namespace    https://xianghongai.github.io
// @version      0.1.2
// @description  Hi, Google Translate, don't translate here
// @author       Nicholas Hsiang
// @icon         https://xinlu.ink/favicon.ico
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let preEles = [
        ...document.querySelectorAll('pre')
    ];
    let preEle = null;

    if (preEles.length) {
        for (let i = 0; i < preEles.length; i++){
            preEle = preEles[i];
            preEle.classList.add('notranslate');
            preEle.setAttribute('translate', 'no');
        }
    }
})();