// ==UserScript==
// @name         StreamHTML chatsize fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       _hishe
// @match        http://streamhtml5.com/*
// @grant        none
// ==/UserScript==

(function() {
    
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
    addGlobalStyle('.video-container { width: 84% !important; }');
    addGlobalStyle('.chat-container { width: 16% !important; }');
})();