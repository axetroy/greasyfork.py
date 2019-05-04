// ==UserScript==
// @name         Button Checker
// @namespace    http://www.reddit.com/r/thebutton
// @version      0.1
// @description  watches the button
// @author       Marsh
// @match        http://www.reddit.com/r/thebutton
// @grant        none
// ==/UserScript==


var timerVar    = setInterval (function() {CheckEvery5Seconds (); }, 5000);

function CheckEvery5Seconds()
{
var tenSec = document.getElementById('thebutton-s-10s');

if (tenSec.value <= 1)
{
    alert('Button has less than 20 seconds!');
    clearInterval(timerVar);
    return;
}
}