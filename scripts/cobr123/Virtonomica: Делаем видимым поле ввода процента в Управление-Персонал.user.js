// ==UserScript==
// @name           Virtonomica: Делаем видимым поле ввода процента в Управление-Персонал
// @version        1.4
// @include        http*://*virtonomic*.*/*/main/company/view/*/unit_list/employee
// @description Делаем видимым поле ввода процента в компания-Управление-Персонал
// @grant       none
// @namespace virtonomica
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	//alert("begin");
	var input = document.getElementById("selectedPercent_input");
 	input.setAttribute('type','text');
 	input.setAttribute('size',3);
	input.oninput = function() {
  		document.getElementById('selectedPercent').innerHTML = input.value;
  		document.getElementById('selectedPercent').value = input.value;
	}
	//alert("end");
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}