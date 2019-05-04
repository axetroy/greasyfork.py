// ==UserScript==
// @name Farmer+
// @namespace Ferss to najlepszy gracz plemion
// @description by Ferss
// @grant none
// @version     BETA v1.0
// ==/UserScript==
javascript_:var arr=$("span.groupRight"),i=0,t=setInterval(function(){$(arr[i++]).click();if(i>arr.length)clearInterval(t);},30000); 