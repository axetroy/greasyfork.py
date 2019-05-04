// ==UserScript==
// @name etorrent page navigation keybind
// @description press n to go to the next page and b for backward
// @homepageURL https://gist.github.com/chidea/3ea515a554946d3001ca9f429d1c8612
// @author ChIdea
// @version 0.1
// @date 11/23/2017
// @namespace chidea
// @match http*://*.etorrent.co.kr/bbs/*
// @include http*://etorrent.co.kr/bbs/*
// @include http*://*.etobang.co.kr/bbs/*
// @include http*://etobang.co.kr/bbs/*
// @include http*://*.etorrent.kr/bbs/*
// @include http*://etorrent.kr/bbs/*
// @include http*://*.etoland.co.kr/bbs/*
// @include http*://etoland.co.kr/bbs/*
// @grant none
// @license MIT License
// ==/UserScript==

function getButton(accessKey){ return document.querySelector('input[accesskey='+accessKey+']'); }

document.onkeypress=function(e){
    var ae = document.activeElement;
    if(ae.tagName === 'TEXTAREA' || (ae.tagName === 'INPUT' && (ae.tagName === 'text' || ae.tagName === 'password'))) return;
    var k = e.key;
    if (k==='n' || k==='b') getButton(k).click();
};