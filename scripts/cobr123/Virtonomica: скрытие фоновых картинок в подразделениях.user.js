// ==UserScript==
// @name           Virtonomica: скрытие фоновых картинок в подразделениях
// @namespace      virtonomica
// @version 	   1.0
// @description    Скрывает фоновые картинки в подразделениях
// @include        http*://*virtonomic*.*/*/main/unit/view/*
// ==/UserScript==

var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;

  $('body').css('backgroundImage','').css('background','#fffbf1');
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}