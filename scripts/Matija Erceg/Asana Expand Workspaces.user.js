// ==UserScript==
// @name         Asana Expand Workspaces
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  automatically expand the workspaces list in the top right dropdown
// @author       Matija Erceg
// @match        https://app.asana.com/*
// @grant        none
// @run-at       document-end
// @require      http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.8.0.js
// ==/UserScript==

var style = $('<style>.topbarSettingsMenu .menuScrollableSection--medium { max-height: 450px!important; }</style>');
$('html > head').append(style);