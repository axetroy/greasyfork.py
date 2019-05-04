// ==UserScript==
// @name         IT之家手机版去除广告
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  IT之家手机版去除列表中的广告和文章中的广告
// @author       linmii
// @match        *://m.ithome.com/*
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    checkJquery();
    removeAds();
    $(".open-app-banner").remove();
    $(".open-app").remove();
})();

$(document).scroll(function(){
    removeAds();
    removeArticleAds();
})

function removeArticleAds() {
    $(".down-app-box").remove();
    $("div[class='lapin']").remove();
}

function removeAds() {
    var spans = $("span[class='tip tip-gray']");
    spans.each(function() {
        $(this).closest("div.placeholder").remove();
    });
}

function checkJquery() {
    if (!typeof jQuery) {
        var jqueryScript = document.createElement("script");
        jqueryScript.type = "text/javascript";
        jqueryScript.src = "https://code.jquery.com/jquery-3.3.1.min.js";
        document.head.append(jqueryScript);
    }
}