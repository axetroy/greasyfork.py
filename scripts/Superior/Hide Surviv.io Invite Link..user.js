// ==UserScript==
// @name         Hide Surviv.io Invite Link.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide the surviv.io invite link!
// @author       Superior
// @match        *://surviv.io/*
// @run-at       document-idle
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

jQuery('#team-url').remove()
jQuery('#team-code').remove()
