// ==UserScript==
// @name        Copy/Paste for banking.barclaycard.de
// @description banking.barclaycard.de disables pasting through Javascript. This script reenables it.
// @namespace   http://drugtestbots.info/barclaycard.de
// @include     https://banking.barclaycard.de/*
// @version     1
// @grant       none
// ==/UserScript==
function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}
exec(function(){$(document).ready(function(){$("input[type='password']").each(function(i, elm){elm.onpaste=function(){return true;};})})});