// ==UserScript==
// @name         掘金去广告
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  掘金首页及详情页去广告
// @author       laohu
// @match        https://juejin.im
// @match        https://juejin.im/*
// @match        https://juejin.im/post/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

var internalId = null;
(function() {
    'use strict';

    internalId = setInterval(function () {
        clear();
    }, 20);

    function clear() {
        if(document.URL.indexOf("https://juejin.im/post/") != -1) {
            clearPostAdvert();
        } else {
            clearHomeAdvert();
        }
    }

    function clearHomeAdvert() {
        $(".sidebar-block.sticky-block").remove();
        $(".index-book-collect.sidebar-block.books-block").remove();
        $(".app-download-block").remove();
        $(".banner.section.shadow.banner-section").remove();

        var ads = $(".sidebar-block.banner-block").remove();
        ads.remove();
        if(ads.length > 0) {
            clearInterval(internalId);
        }
    }

    function clearPostAdvert() {
        $(".app-download-sidebar-block").remove();
        var ads = $(".index-book-collect");
        ads.remove();
        if(ads.length > 0) {
            clearInterval(internalId);
        }
    }
})();