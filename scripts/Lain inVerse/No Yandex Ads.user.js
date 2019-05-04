// ==UserScript==
// @name        No Yandex Ads
// @namespace   lainverse_no_yandex_ads
// @description Удаляет рекламу из результатов поиска Яндекс. Removes ads in Yandex search results.
// @author      lainverse
// @license     CC BY-SA
// @version     6.3
// @include     /^https?://(news\.yandex\.|(www\.)?yandex\.[^/]+/(yand)?search[/?])/
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function(){
    'use strict';

    var win = window;
    var adWords = ['Яндекс.Директ','Реклама','Ad'];
    function remove(node) {
        node.parentNode.removeChild(node);
    }
    // Generic ads removal and fixes
    function removeGenericAds() {
        var s, i;
        s = document.querySelector('.serp-header');
        if (s) {
            s.style.marginTop='0';
        }
        s = document.querySelectorAll('.serp-adv__head + .serp-item');
        i = s.length;
        while(i--) {
            s[i].parentNode.removeChild(s[i]);
        }
        s = document.querySelectorAll('#adbanner, .serp-adv, .b-spec-adv, div[class*="serp-adv__"]');
        i = s.length;
        while(i--) {
            remove(s[i]);
        }
    }
    // Search ads
    function removeSearchAds() {
        var s = document.querySelectorAll('.serp-block, .serp-item, .search-item');
        var i = s.length, item;
        while(i--) {
            item = s[i].querySelector('.label, .serp-item__label, .document__provider-name');
            if (item && adWords.indexOf(item.textContent) > -1) {
                remove(s[i]);
                console.log('Ads removed.');
            }
        }
    }
    // News ads
    function removeNewsAds() {
        var s = document.querySelectorAll('.page-content__left > *,.page-content__right > *:not(.page-content__col),.page-content__right > .page-content__col > *');
        var i = s.length;
        while(i--) {
            if (s[i].textContent.indexOf(adWords[0]) > -1) {
                remove(s[i]);
                console.log('Ads removed.');
            }
        }
    }
    // News fixes
    function removePageAdsClass() {
        if (document.body.classList.contains("b-page_ads_yes")){
            document.body.classList.remove("b-page_ads_yes");
            console.log('Page ads class removed.');
        }
    }
    // Function to attach an observer to monitor dynamic changes on the page
    function pageUpdateObserver(func, obj, params) {
        if (obj) {
            var o = new MutationObserver(func);
            o.observe(obj,(params || {childList:true, subtree:true}));
        }
    }
    // Cleaner
    document.addEventListener ("DOMContentLoaded", function() {
        removeGenericAds();
        if (win.location.hostname.search(/^news\./i) === 0) {
            pageUpdateObserver(removeNewsAds, document.querySelector('BODY'));
            pageUpdateObserver(removePageAdsClass, document.body, {attributes:true, attributesFilter:['class']});
            removeNewsAds();
            removePageAdsClass();
        } else {
            pageUpdateObserver(removeSearchAds, document.querySelector('.main__content'));
            removeSearchAds();
        }
    });
})();