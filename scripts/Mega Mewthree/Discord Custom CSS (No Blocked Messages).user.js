// ==UserScript==
// @name         Discord Custom CSS (No Blocked Messages)
// @namespace    https://discord.gg/BwqMNRn
// @version      0.1
// @description  Overrides the Discord CSS to prevent the blocked message indicator from appearing.
// @author       Lucario
// @match        https://discordapp.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

var css = '.message-group-blocked {display:none;}';
var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
}else{
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);