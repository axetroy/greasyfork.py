// ==UserScript==
// @name         QQ邮箱自动跳过安全隐患
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       CXYD
// @match        https://mail.qq.com/cgi-bin/help_static_send*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
      var link=document.getElementById("skip_btn").href;
        window.location.href=link;
})();