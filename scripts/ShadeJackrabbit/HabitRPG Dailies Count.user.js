// ==UserScript==
// @name         HabitRPG Dailies Count
// @namespace    https://habitrpg.com
// @version      1.0
// @description  Update HabitRPG with the number of dailies left
// @author       ShadeJackrabbit
// @match        http*://habitrpg.com/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

var tasksLeft = $(".daily:not(.completed)").length;
document.title = "HabitRPG | Dailies left: ("+tasksLeft+")";