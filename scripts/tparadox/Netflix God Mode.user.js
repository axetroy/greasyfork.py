// ==UserScript==
// @name            Netflix God Mode
// @description     Adapted from a bookmarklet by Renan Cakirerk (bit2pixel.com)
// @include         http://www.netflix.com/*
// @version         0.1
// @grant           none
// @namespace https://greasyfork.org/users/4337
// ==/UserScript==


(function() {
          _.map(_.toArray(document.getElementsByClassName('slider')),
          function(e) {
            e.parentNode.replaceChild(e.firstChild, e)          });
            _.map(_.union(
            _.toArray(document.getElementsByClassName('sliderButton')),
            _.toArray(document.getElementsByClassName('evidence')),
            _.toArray(document.getElementsByClassName('sharing-prompt')),
            _.toArray(document.getElementsByClassName('boxShotDivider'))),
          function(e) {
              e.parentNode.removeChild(e)          });
})();