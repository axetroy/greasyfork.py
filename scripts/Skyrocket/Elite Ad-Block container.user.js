// ==UserScript==
// @name         Elite Ad-Block container
// @namespace    http://www.nextgenupdate.com
// @version      0.1
// @description  Removes the ad block container for elite members
// @author       You
// @match        http://www.nextgenupdate.com/forums/*
// @grant        none
// ==/UserScript==

var ad = document.getElementById("ad-block");
ad.parentNode.removeChild(ad);


