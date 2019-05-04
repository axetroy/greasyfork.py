// ==UserScript==
// @name           Virtonomica: Кнопка "вверх" для форума
// @version        1.3
// @include        http*://*virtonomic*.*/*/forum/*
// @description Добавляет кнопку "вверх" внизу страниц форума
// @grant       none
// @namespace virtonomica
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	//alert("begin");
	var head = $("body");
	head.append("<div style=\"cursor: pointer; font-size: 50pt; position: fixed; bottom: 10px; right: 10px;\" onclick=\"$('html, body').animate({ scrollTop: 0 }, 'fast');\">&#8657;</div>");
	//alert("end");
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}