// ==UserScript==
// @name           Virtonomica: Делаем видимым поле ввода процента и количества в управлении сертификатами корпорации
// @version        1.5
// @include        http*://*virtonomic*.*/*/main/corporation/token
// @description    Делаем видимым поле ввода процента и количества в управлении сертификатами корпорации
// @grant          none
// @namespace      virtonomica
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	//alert("begin");
	var qtyInput = $('<input type="text" size="3">');
	qtyInput.change( function(){
  		//$('#qtySlider').html(qtyInput.value);
  		//$('#qtySlider').val(qtyInput.val());
  		//$('#qtySlider').change();
                $("#qtySlider").slider('value', qtyInput.val());
                loadDistributionData();
	});
    $("#qtySlider").after(qtyInput);
  
	var percentInput = $('<input type="text" size="3">');
	percentInput.change( function(){
  		//$('#percentSlider').html(percentInput.value);
  		//$('#percentSlider').val(percentInput.val());
  		//$('#percentSlider').change();
                $("#percentSlider").slider('value', percentInput.val());
                loadDistributionData();
	});
    $("#percentSlider").after(percentInput);
	//alert("end");
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}