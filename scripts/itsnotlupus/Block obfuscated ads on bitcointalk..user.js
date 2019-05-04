// ==UserScript==
// @name         Block obfuscated ads on bitcointalk.
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://bitcointalk.org/*
// @grant        none
// ==/UserScript==

/*jshint esversion:6 */
(function() {
    'use strict';
    // remove ad and shitty signatures.
    document.querySelectorAll("table>tbody>tr>td>table>tbody>tr>td>div:not([id]):not(.post):not(.subject):not(.personalmessage):not(.smalltext)[class]").forEach(t=>t.remove());
    // remove ad disclaimer.
    document.querySelectorAll("form>table>tbody>tr>td>span").forEach(t=>t.remove());
    // remove some <hr> tags
    document.querySelectorAll("td.smalltext hr").forEach(t=>t.remove());
})();
