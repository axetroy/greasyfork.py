// ==UserScript==
// @name         自動しおり for 小説を読もう
// @version      0.12
// @description  自動的にしおりを差し込む（おせっかい）システム。
// @author       Velgail
// @include       http*://ncode.syosetu.com/*
// @include       http*://novel*.syosetu.com/*
// @grant        none
// @namespace https://greasyfork.org/users/135617
// ==/UserScript==

function setD(){
    var js = document.createElement('script');
    var head    = (document.head) ? document.head : document.querySelector('head');
    js.innerHTML=[
        '$(window).on("scroll", function() {',
        'scrollEvents();',
        '});',
        '$(body).on("touchmove", function() {',
        'scrollEvents();',
        '});',
        'function scrollEvents(){',
        'var apoint;',
        '$("a[href=\'javascript:void(0)\'").each(function(){if($(this).html()==="しおりを挿む"){apoint=$(this)}});',
        'var scrollPosition = $(window).height() + $(window).scrollTop();',
        'if (scrollPosition > apoint.offset().top+100) {',
        'apoint.trigger("click");;',
        '}else{',
        '}',
        '}'
    ].join("\n");
    head.appendChild(js);
}

setD();