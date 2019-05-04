// ==UserScript==
// @name         Toggle Reddit Sidebar
// @namespace    http://www.github.com/srunni
// @version      0.2
// @description  Toggles Reddit sidebar (turned off by default) when you press Ctrl+Alt+s
// @author       Samir Unni
// @include      http://*.reddit.com/*
// @grant        none
// ==/UserScript==

setTimeout(function() {
	document.querySelector("div.side").style.display = 'none';
}, 100);

window.onkeydown = function(event) {
    if (event.ctrlKey && event.altKey && event.keyCode === 83) {
        var sidebar = document.querySelector("div.side"); 
        sidebar.style.display = sidebar.style.display === 'none' ? '' : 'none';
    }
};