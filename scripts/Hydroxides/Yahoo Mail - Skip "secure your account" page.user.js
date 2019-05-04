// ==UserScript==
// @name        Yahoo Mail - Skip "secure your account" page
// @namespace   Hydroxides
// @description Automatically skip the "Help us keep your account safe" page
// @version     1.01
// @include     https://login.yahoo.com/account/update?*
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
  var formElement = document.getElementsByClassName("do-it-later text-sm")[0];
  if(formElement !== null) {
    formElement.click();
  }
}, false);