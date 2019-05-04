// ==UserScript==
// @name         Zimuku2pianyuan
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Add Pianyuan.net and Rarbg.is search buttons to Zimuku
// @author       Johnxon
// @match        https://www.zimuku.cn/detail/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("span.py{background:#20A4FF;padding:16px 20px !important;height:50px;font-size:18px;color:#fff !important} span.rarbg{background:#505599;padding:16px 20px !important;height:50px;font-size:18px;color:#fff !important}");
    var keywords = $("meta[name='keywords']").attr("content");
    var title = keywords.split(',')[0];
    var en_title = keywords.split(',')[1];
    var pianyuanBtn = '<a href="http://pianyuan.net/search?q=' + title + '" target="_blank"><span class="py">片源</span></a>';
    var rarbgBtn = '<a href="https://rarbg.is/torrents.php?search=' + en_title + '" target="_blank"><span class="rarbg">RARBG</span></a>';
    var btnDownload = $('.dl').parent();
    btnDownload.after(pianyuanBtn);
    btnDownload.after(rarbgBtn);
})();