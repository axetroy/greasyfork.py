// ==UserScript==
// @namespace    https://github.com/troyliu0105/reimuhelper
// @name         灵梦御所的老司机
// @version      0.0.1
// @description  开车注意安全!!!
// @author       troyliu0105
// @include      *://blog.reimu.net/archives/*
// @icon         https://blog.reimu.net/wp-content/uploads/2016/02/cropped-logo-192x192.png
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    var pres = document.getElementsByTagName("pre");
      for (var i = 0; i< pres.length; i++) {
        pres[i].style.display = 'block';
      }
})();
