// ==UserScript==
// @name         Julien
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Julien
// @match        https://erzbe.sharepoint.com/sites/bfb/default.aspx?wa=wsignin1.0
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementsByClassName("ms-core-overlay")[0].style.backgroundColor="#121212";
    document.getElementsByClassName("ms-webpart-chrome-title")[0].style.backgroundColor="#323232";
    document.getElementsByClassName("ms-webpart-chrome-title")[1].style.backgroundColor="#323232";
    document.getElementsByClassName("ms-webpart-chrome-title")[2].style.backgroundColor="#323232";
    document.getElementsByClassName("ms-webpart-chrome-title")[3].style.backgroundColor="#323232";
    document.getElementsByClassName("ms-webpart-chrome-title")[4].style.backgroundColor="#323232";
    document.getElementsByClassName("ms-webpart-chrome-title")[5].style.backgroundColor="#323232";
    document.getElementsByClassName("ms-webpart-chrome-title")[6].style.backgroundColor="#323232";
    document.getElementsByClassName("ms-webpart-chrome-title")[7].style.backgroundColor="#323232";
    document.getElementsByClassName("ms-vb")[0].style.color="royalblue";
    document.getElementsByClassName("ms-vb")[1].style.color="royalblue";
    document.getElementsByClassName("ms-vb")[2].style.color="royalblue";
    document.getElementsByClassName("ms-vb")[3].style.color="royalblue";
    document.getElementsByClassName("ms-vb")[4].style.color="royalblue";
    document.getElementsByClassName("ms-vb")[5].style.color="royalblue";
    document.getElementsByClassName("ms-vb")[6].style.color="royalblue";
    document.title = '(3) mytitle';
    // Your code here...
})();