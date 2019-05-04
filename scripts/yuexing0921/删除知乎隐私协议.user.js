// ==UserScript==
// @name         删除知乎隐私协议
// @namespace    http://tampermonkey.net/
// @require      https://cdn.bootcss.com/jquery/2.0.2/jquery.min.js
// @version      0.7
// @description  用于删除pc端知乎隐私协议的弹窗
// @author       yuexing0921
// @match        https://*.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  window._PrivacyInterval = setInterval(() => {
    var modal = $(".Modal-wrapper .PrivacyConfirm-title");
    if (modal.length > 0) {
      modal.closest(".Modal-wrapper").remove();
      var root = $("html");
      root.css("overflow", "auto");
      clearInterval(window._PrivacyInterval);
    }
  }, 1000);
})();
