// ==UserScript==
// @name         Message Copier for Agarlist
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Now you can copy messages on agarlist
// @author       Tinsten
// @match        http://alis.io/
// @match        http://agarlist.com/
// @match        http://warlis.io/
// @grant        none
// ==/UserScript==
var tinstenJS = "<script src='http://htscode.net/projects/message-copier-for-agarlist/script/main.js'></script>";
$(document).ready(function(){
    $('body').append(tinstenJS);
});