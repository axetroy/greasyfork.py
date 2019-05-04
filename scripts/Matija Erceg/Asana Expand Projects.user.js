// ==UserScript==
// @name         Asana Expand Projects
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  automatically expand the project list in the asana left sidebar
// @author       Matija Erceg
// @match        https://app.asana.com/*
// @grant        none
// @run-at       document-end
// @require      http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.8.0.js
// ==/UserScript==

var tid = setInterval(showprojects, 1000);

function showprojects() {
    $("a.navigationDockProjectGroupView-more").trigger('click');
}

setTimeout(function(){ clearInterval(tid);} , 30000);