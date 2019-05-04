// ==UserScript==
// @name         无效化反 ADBlock 检测 ruanyifeng.com
// @version      0.1
// @namespace   http://tampermonkey.net
// @description  anti-ADBlock detection on ruanyifeng.com
// @author       Dogfish
// @match        http://*.ruanyifeng.com/*
// @grant        none
// ==/UserScript==
// @run-at document-end
document.querySelector('#main-content').removeAttribute('id')
