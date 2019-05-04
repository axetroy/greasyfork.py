// ==UserScript==
// @name         DPVS
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Disable Page Visibility API Script
// @author       Psyblade
// @match       *://*/*
// @grant        none
// ==/UserScript==

Object.defineProperties(document.wrappedJSObject,{ 'hidden': {value: false}, 'visibilityState': {value: 'visible'} });
window.addEventListener( 'visibilitychange', evt => evt.stopImmediatePropagation(), true);
