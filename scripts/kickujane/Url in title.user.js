// ==UserScript==
// @name       Url in title
// @namespace  https://infovikol.ch/
// @version    0.1
// @description  Puts the url in the title bar. Very useful for KeePass.
// @match      http*://*/*
// @grant   none
// ==/UserScript==

document.title=document.title+' '+document.URL;