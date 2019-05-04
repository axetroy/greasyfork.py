// ==UserScript==
// @name         steam链接已删除？
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  重新显示steam{链接已删除}的链接
// @author       HCLonely
// @match        *://steamcommunity.com/*
// @match        *://store.steampowered.com/*
// ==/UserScript==

(function() {
    'use strict';
    function showLink(){
        jQuery(".bb_removedlink").hide();
        jQuery(".collapsed_link").show();
    }
    setInterval(showLink,1000);
})();