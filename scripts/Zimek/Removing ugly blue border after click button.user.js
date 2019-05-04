// ==UserScript==
// @name         Removing ugly blue border after click button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removing ugly blue border after click button from all browser
// @author       Zimek
// @match        *://*/*
// @grant        none
// ==/UserScript==

$(`<style>button{outline: none;}body{outline: none;}</style>`).appendTo('head');