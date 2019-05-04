// ==UserScript==
// @name         Steam QuickLaunch
// @namespace    http://github.com/scoliono
// @version      1.0
// @description  Launches games in the "Recent Game Activity" section of a Steam profile at the press of a button
// @author       scoliono
// @match        http*://steamcommunity.com/*/*
// @grant        none
// ==/UserScript==

var g=document.getElementsByClassName('game_info');
for (var i=0; i<g.length; i++)
{
    var anchor = document.createElement("a");
    var txt = document.createTextNode("Launch game");
    anchor.setAttribute("class","whitelink");
    var appID=document.getElementsByClassName('game_name')[i].childNodes[0].getAttribute('href').match(/\d+/g);
    anchor.setAttribute("href","steam://run/"+appID);
    anchor.appendChild(txt);
    g[i].appendChild(document.createElement("br"));
    g[i].appendChild(anchor);
}