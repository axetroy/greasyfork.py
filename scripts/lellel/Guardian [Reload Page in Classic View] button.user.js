// ==UserScript==
// @name        Guardian [Reload Page in Classic View] button
// @namespace   
// @description Adds a button to the bottom of theGuardian.com's web pages. The button reloads the page in Classic View.
// @include     http://www.theguardian.com/*
// @include     http*://*.theguardian.com/*
// @version     0.1
// @grant       lellel
// @icon	http://static.guim.co.uk/favicon.ico
// ==/UserScript==




var input=document.createElement("input");
input.type="button";
input.value="Reload Page in Classic View";
input.onclick = showAlert;
document.body.appendChild(input);
 
function showAlert()
{
   
  window.location.search += '?view=classic';
}

