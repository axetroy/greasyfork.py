// ==UserScript==
// @name         GMail Change Title
// @namespace    http://tagansvar.eu/
// @version      1.0
// @description  Change the GMail title and remove the unread message count!
// @author       Mikkel Kongsfelt
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

function hideUnread()
{
    document.title = 'Gmail';
}
var t=setInterval(hideUnread,10);
