// ==UserScript==
// @name         ApkMirror download button enabler
// @namespace    jyrka98_script
// @version      0.2
// @description  Enables the download button which is temporarily disabled if you use an ad blocker
// @author       Jyrka98
// @match        https://www.apkmirror.com/apk/*/*/*/*-android-apk-download/
// @grant        none
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function() {
        let el = document.querySelector("a.btn.btn-flat.downloadButton[type='button']");
        if (el) {
            el.classList.remove("disabled");
        }
    }, 1000);
})();