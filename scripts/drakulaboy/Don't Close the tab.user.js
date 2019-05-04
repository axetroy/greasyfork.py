// ==UserScript==
// @name         Don't Close the tab
// @namespace    http://torrentsmd.com
// @version      0.2
// @description  for torrentsmd tracker
// @author       drakulaboy
// @include      *torrentsmd.*/upload.php
// @include      *torrentsmoldova.*/upload.php
// @grant        none
// ==/UserScript==
window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "ATENŢIE, inchizi pagina de Upload";

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage;                            //Webkit, Safari, Chrome
});