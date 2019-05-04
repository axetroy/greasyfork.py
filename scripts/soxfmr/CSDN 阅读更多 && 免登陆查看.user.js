// ==UserScript==
// @name         CSDN 阅读更多 && 免登陆查看
// @namespace    http://github.com/soxfmr
// @version      0.4
// @description  CSDN 自动展开全文 && 免登陆查看
// @author       soxfmr
// @match        https://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
    * We shall never surrender - by Churchill
    *
    * To prevent the further changes, you may add the following JavaScript files to the blacklist of adblock:
    * - /check-adblock/1.1.1/check-adblock.js
    *
    */

    var hookedInterval = window.setInterval;

    window.setInterval = function(callback, seconds) {
        // Magic time
        if (seconds == 1e3) {
            document.querySelector('#check-adblock-time').remove();
            return;
        }
        hookedInterval(callback, seconds);
    };

    var btnMore = document.getElementById("btn-readmore");
    if (btnMore !== undefined) {
        btnMore.click();
    } else {
        console.log("No button found.");
    }
})();