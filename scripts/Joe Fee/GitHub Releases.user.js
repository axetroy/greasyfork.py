// ==UserScript==
// @name         GitHub Releases
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*/*
// @grant        none
// @run-at       document-end
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var url = location.href;
    $(".btn.btn-sm.BtnGroup-item").eq(0).before('<a class="btn btn-sm BtnGroup-item" href="' + url + '/releases">下载Releases</a>');

})();