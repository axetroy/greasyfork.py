// ==UserScript==
// @name Championi
// @namespace Violentmonkey Scripts
// @grant none
// @version 1.1.1
// @description by Ferss
// ==/UserScript==
javascript_:var arr=$("a.btn"),i=0,t=setInterval(function(){$(arr[i++]).click();if(i>arr.length)clearInterval(t);},12345);