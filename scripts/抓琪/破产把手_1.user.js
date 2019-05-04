// ==UserScript==
// @name         破产把手_1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.neopets.com/space/strangelever.phtml
// @grant        none
// ==/UserScript==

setTimeout(function(){$('input[value="Pull the Lever Anyway"]').trigger("click");},Math.floor(Math.random()*4000))