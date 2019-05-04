// ==UserScript==
// @name         CSDN去广告自动全文
// @namespace    https://www.zhibo8.cc/
// @icon         https://www.google.com/s2/favicons?domain=blog.csdn.net
// @version      1.0
// @description  CSDN去广告,自动展开全文
// @author       老胡
// @match        https://blog.csdn.net/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    clearHomePageAds();
    autoExpandArticle();

    function clearHomePageAds() {
        var t = setInterval(function () {
            clearHomeAds();
        }, 50);
    }

    function clearHomeAds() {
        $('.csdn-tracking-statistics.mb8.box-shadow').remove();

        var goTopBox = $('.meau-gotop-box');
        if(goTopBox) {
            goTopBox.remove();
        } else {
            clearInterval(t);
        }

        var iframes = $('iframe');
        var delIframe = [];
        for(var i = 0; i < iframes.length; i++) {
            if(iframes[i].src.indexOf('baidu.com') != -1) {
                delIframe.push(iframes[i]);
            }
        }
        for(i = 0; i < delIframe.length; i++) {
            delIframe[i].remove();
        }
    }

    function autoExpandArticle() {
        var autoBtns = $('#btn-readmore');
        if(autoBtns.length > 0) {
            autoBtns[0].click();
        }
    }

})();