// ==UserScript==
// @name           Virtonomica: выделить все позиции товара в снабжении
// @version        1.6
// @include        http*://*virtonomic*.*/*/main/unit/view/*/supply
// @description    Добавляет чекбокс "выделить все" для каждого товара в снабжении
// @author         cobra3125
// @namespace      virtonomica
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	
	var cbs = $('table.list > tbody > tr > td:nth-child(1) > input[type="checkbox"]');
	if(cbs.length > 0){
		var box = $('<input type="checkbox" style="float:left;">').click(function(){
			var row = $(this).closest('tr');
			var checked = $(this).is(':checked');
			var next = row.next();
			while (next.length > 0 && !next.hasClass('p_title')) {
				$('> td:nth-child(1) > input[type="checkbox"]', next).attr('checked', checked);
				next = next.next();
			}
		});
		$('a:has(img[src="/img/supplier_add.gif"])').after(box);
	}
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}