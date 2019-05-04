// ==UserScript==
// @name         Finobe | Anti-AdBlock Blocker
// @namespace    https://finobe.com
// @version      1.4
// @description  Because fuck Finobe's Anti-AdBlock.
// @author       Database
// @match        https://finobe.com/*
// @match        https://www.finobe.com/*
// @run-at        document-start
// @grant GM_addStyle
// @grant GM_info
// @grant GM_getMetadata
// ==/UserScript==
function addGlobalStyle(css) {
   var head, style;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = css;
   head.appendChild(style);
}

(function() {
    'use strict';
    addGlobalStyle('.alert { background: transparent !important;font-size:0px !important;height:0px !important; }');
addGlobalStyle('.alert-danger { background: transparent !important;font-size:0px !important;height: 0px !important; }');
})();