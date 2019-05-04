// ==UserScript==
// @name           Virtonomica: кнопка на реалм Mary
// @version        1.03
// @namespace      virtonomica
// @description    Добавляет кнопку для перехода на реалм Mary в выпадающий список реалмов
// @include        http*://virtonomica.*/*/main/*
// ==/UserScript==


var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    $('.menu_settings > li:nth-child(5)')
        .append($('<a>').attr('href', '/mary/main/user/privat/headquarters').text('Mary'))
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);