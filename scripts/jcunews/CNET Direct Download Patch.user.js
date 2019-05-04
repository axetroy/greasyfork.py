// ==UserScript==
// @name        CNET Direct Download Patch
// @namespace   CNETDirectDownloadPatch
// @description Make the green file download button points directly to the file download instead of the "Thank you" download page.
// @author      jcunews
// @include     *://download.cnet.com/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

var ele = document.createElement("SCRIPT");
ele.text = "(" + (function() {
  document.querySelectorAll_ = document.querySelectorAll;
  document.querySelectorAll = function() {
    if (window.fireTrackDownloadClick) {
      fireTrackDownloadClick = function(arr, sel, ele){
        var atr = ele.attributes["data-dl-url"];
        if (atr) {
          var lnk = ele.querySelector(".dln-a");
          if (lnk) {
            lnk.href = atr.value;
          }
        }
        return null;
      };
      document.querySelectorAll = document.querySelectorAll_;
    }
    return this.querySelectorAll_.apply(this, arguments);
  };
}).toString() + ")()";
document.head.appendChild(ele);
