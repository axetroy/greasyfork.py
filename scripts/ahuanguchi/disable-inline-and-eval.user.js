// ==UserScript==
// @name         disable-inline-and-eval
// @namespace    https://github.com/ahuanguchi
// @version      1.0.1
// @description  Use a default Content Security Policy to prevent inline JavaScript and eval from working.
// @author       ahuanguchi
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

var csp = document.createElement("meta");
csp.setAttribute("http-equiv", "Content-Security-Policy")
csp.setAttribute("content", "script-src *")
document.head.appendChild(csp);
