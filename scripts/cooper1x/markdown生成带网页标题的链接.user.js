// ==UserScript==
// @name         markdown生成带网页标题的链接
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Cooper
// @match        *://*/*
// @grant        none
// @run-at       context-menu
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    function getMdToUrl(title, url) {
        return `[${title}](${url})`;
    }
    function copyText(text) {
        let copyInput = document.createElement('input');
        copyInput.type = 'text';
        document.body.appendChild(copyInput);
        copyInput.value = text;
        copyInput.select();
        const result = document.execCommand('Copy');
        document.body.removeChild(copyInput);
        return result;
    }
    copyText(getMdToUrl(document.title, document.URL));
})();