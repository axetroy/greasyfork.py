// ==UserScript==
// @name         去除淘宝低同行评价的条目
// @description:en Hide Bad Reputation Taobao Items
// @namespace    https://greasyfork.org/en/users/22079-hntee
// @version      0.1
// @author       hntee
// @include     http://*.taobao.com/*
// @include     https://*.taobao.com/*
// @description 去除淘宝低同行评价的条目（屏蔽多于一个绿色的商家）
// @require      http://cdn.bootcss.com/jquery/3.0.0/jquery.min.js

// ==/UserScript==


var debug = false;

(function() {
    'use strict';
    // Your code here...
    window.addEventListener("load", filterBad ,false);
    observeDomChange();
})();

function observeDomChange() {
    var MutationObserver = window.MutationObserver;
    var myObserver       = new MutationObserver (mutationHandler);
    var obsConfig        = {
        childList: true, attributes: true,
        subtree: true,   attributeFilter: ['mainsrp-itemlist']
    };
    myObserver.observe (document, obsConfig);
    function mutationHandler (mutationRecords) {
        filterBad();
    }
}

function filterBad() {
    var allItems = $('.dsrs');
    var badItems = $('.dsrs').filter(function() {
        return $(this).find('.lessthan').length > 1;
    });

    var removeNum = allItems.length - badItems.length;
    if (debug) console.log(removeNum + ' items ' + 'removed');

    badItems.parent().parent().parent().parent().parent().hide();
}

