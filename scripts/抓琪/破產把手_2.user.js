// ==UserScript==
// @name         破產把手_2
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  try to take over the world!
// @author       You
// @match        http://www.neopets.com/space/leverofdoom.phtml
// @grant        none
// ==/UserScript==



if($("*:contains('Something Has Happened')").length == 0)
{
setTimeout(function(){$('input[value="Go Back to the Lever"]').trigger("click");},Math.floor(Math.random()*2000))
}