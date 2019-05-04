// ==UserScript==
// @name        Yahoo Mail - Skip Password Change Request
// @namespace   Hydroxides
// @description Skip password change screens
// @include     https://*.yahoo.com/config/change_pw?*
// @version     1.00
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
  var formElement = document.getElementById("enter-information-form");
  if(formElement != null) {
    formElement.submit();
  } else {
    document.getElementById("cancel-password-form").submit();
  }
}, false);