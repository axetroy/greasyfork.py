// ==UserScript==
// @name         Voat Fill Screen 
// @version      1.1
// @description  forces voat to fill the screen
// @author       Scotty-Brooks
// @match        https://voat.co/*
// @grant        none
// @namespace https://greasyfork.org/users/12486
// ==/UserScript==

document.querySelector("#container").style.maxWidth = "100%";
document.querySelector("#header-banner").style.maxWidth = "100%";