// ==UserScript==
// @name         Varzesh3 No-Ads
// @namespace    http://varzesh3.com/
// @version      1.0
// @description  No More ads, no more bugs, Varzesh3 is Cleaned
// @date         2016-09-11
// @author       Arashi
// @match        http://www.varzesh3.com
// @include      http://varzesh3.com/*
// @include      http://www.varzesh.com/*
// @include      http://varzesh3.com/*
// @require      https://code.jquery.com/jquery-3.1.0.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    
    var fontimp = null;
    fontimp += '.widget-place { width : 300px !important; }';
    GM_addStyle(fontimp);
    
    $('.ad-container').remove();
    $('#widget-place-2 div.ad').remove();
    $('#ads-C').remove();
    $('#ads-A').remove();
})();