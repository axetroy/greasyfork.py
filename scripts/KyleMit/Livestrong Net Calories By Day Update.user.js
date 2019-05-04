// ==UserScript==
// @name         Livestrong Net Calories By Day Update
// @namespace    http://kylemitofsky.com/
// @version      0.1
// @description  Manually runs the script to populate net calories by day
// @author       Kyle Mitofsky
// @match        http://www.livestrong.com/myplate*
// @grant        none
// ==/UserScript==


window.setTimeout(function() {
    s = document.querySelector("#calories_by_day script"); 
    eval(s.innerText);
},1000);