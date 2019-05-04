// ==UserScript==
// @name         未登陆天猫不转跳登陆页面
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  未登陆天猫不转跳登陆页面。
// @author       only1wrod
// @include     /http(?:s|):\/\/(?:chaoshi\.detail|detail|item)\.tmall\.(?:[^./]+)\/item\.htm/
// @run-at      document-start
// @grant        none
// ==/UserScript==

if(!/^(.*;)?\s*_nk_\s*=\s*[^;]/.test(document.cookie)){
   Object.freeze(location);
}