// ==UserScript==
// @name        Reveal FOSSHub Real Download URLs
// @namespace   RevealFOSSHubRealDownloadURLs
// @description Reveal FOSSHub real download URLs which are pointed by download links
// @author      jcunews
// @include     https://www.fosshub.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function check() {
  var eles = document.querySelectorAll(".dwl-link"), i, count = eles.length;
  for (i = eles.length-1; i >= 0; i--) {
    if (!eles[i].ok) {
      var attr = eles[i].attributes["fdslwdx"];
      if (attr) {
        eles[i].href = attr.value;
        eles[i].ok = 1;
        count--;
      }
    } else count--;
  }
  if (count) setTimeout(check, 1000);
})();
