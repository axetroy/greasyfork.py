// ==UserScript==
// @name moneta co minute
// @namespace Violentmonkey Scripts
// @grant none
// @version 1.9.12
// @description by Ferss
// ==/UserScript==
javascript_:var arr=$("input.btn-default"),i=0,t=setInterval(function(){$(arr[i++]).click();if(i>arr.length)clearInterval(t);},60000);