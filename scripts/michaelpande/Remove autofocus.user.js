// ==UserScript==
// @namespace https://github.com/michaelpande/greasemonkey_remove_autofocus
// @name Remove autofocus
// @author Michael Pande <github.com/michaelpande>
// @description Makes vim keybindings work correctly on webpages with autofocus
// @supportURL https://github.com/michaelpande/greasemonkey_remove_autofocus
// @version 1.0.2
// @license MIT
// @grant none
// ==/UserScript==
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    var lostFocus = false;
    var time = 3000;
    var interval = 25;


    function focusRemoval(){
      time = time - interval;
      if(lostFocus || time <= 0){
        clearInterval(focusCheck);
        return;
      }
      if(document.activeElement) {
        lostFocus = true;
        document.activeElement.blur();
      }

    }
    var focusCheck = setInterval(focusRemoval, interval);
  });
})();
