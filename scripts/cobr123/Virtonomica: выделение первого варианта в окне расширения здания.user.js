// ==UserScript==
// @name           Virtonomica: выделение первого варианта в окне расширения здания
// @namespace      virtonomica
// @version 	   1.2
// @description    Выделяет первый доступный вариант в окне расширения завода и других юнитов
// @include        http*://*virtonomic*.*/*/window/unit/upgrade/*
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    if($('input[type=radio]').length == 1){
       $('input[type=radio]:first').attr('checked' , true);
    }
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}