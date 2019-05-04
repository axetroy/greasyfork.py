// ==UserScript==
// @name           Virtonomica: автопереход на следующую страницу при строительстве
// @version        1.5
// @include        http*://*virtonomic*.*/*/main/unit/create/*
// @description    Добавляет автопереход на следующую страницу при выборе варианта строительства
// @author         cobra3125
// @namespace      virtonomica
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	
	$('form > table.list > tbody > tr > td > input[type="radio"]').each(function() {
        var cbox = $(this);
        cbox.change(function() {
            if ($(this).is(':checked')) {
              	setTimeout( function(){ $('input[type="submit"][name="next"]').click(); }, 200);
            }
        });
        cbox.parent().parent().click(function() {
            cbox.prop('checked',true).change();
        });
	});
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}