// ==UserScript==
// @name        Bum Marks
// @namespace   lexscript
// @description Changes Cutie Marks into Bum Marks
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

//document.querySelectorAll("input[value='Cutie Marks']")[0].value = "Bum Marks"
a = document.getElementsByTagName('body')[0];
a.innerHTML = a.innerHTML.replace(new RegExp("Cutie Mark", 'g'), "Bum Mark");