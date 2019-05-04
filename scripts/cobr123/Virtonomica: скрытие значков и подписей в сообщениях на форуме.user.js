// ==UserScript==
// @name           Virtonomica: скрытие значков и подписей в сообщениях на форуме
// @namespace      virtonomica
// @version 	   1.1
// @description    Скрывает значки подарков\достижений и подпись в сообщениях на форуме
// @include        http*://*virtonomic*.*/*/forum/*
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    $('td[class="forum_message_userinfo"] > noindex > div').each(function(){
        jQuery(this).hide();
    });
    $('td[class="forum_message_userinfo"] > noindex > p').each(function(){
        jQuery(this).hide();
    });
    $('td[class="signature"]').each(function(){
        jQuery(this).hide();
    });
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}