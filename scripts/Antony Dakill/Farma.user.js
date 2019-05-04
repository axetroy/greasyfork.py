// ==UserScript==
// @name Farma
// @namespace Violentmonkey Scripts
// @grant none
// @version 1.9.12
// @description by Ferss
// ==/UserScript==
javascript_:var arr=$("a.farm_icon_c"),i=0,t=setInterval(function(){$(arr[i++]).click();if(i>arr.length)clearInterval(t);},257);