// ==UserScript==
// @name         CleverManka.net GIF de-strober
// @namespace    http://jenpollock.ca/
// @version      0.1
// @description  workaround for IntenseDebate/Chrome bug that causes strobing when comments include wide images
// @author       Jen Pollock
// @include      http://clevermanka.net/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("div.idc-c-t-inner div {overflow: hidden !important;}");
})();