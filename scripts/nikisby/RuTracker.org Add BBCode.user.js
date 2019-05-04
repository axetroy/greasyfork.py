// ==UserScript==
// @name         RuTracker.org Add BBCode
// @namespace    nikisby
// @version      1.1
// @description  Adds custom BBCode to RuTracker.org reply boxes
// @author       nikisby
// @match        http://rutracker.org/*
// @match        http://*.rutracker.org/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var html = '<select name="test">' +
				'<option value="-1" selected="selected">Ред.мод:</option>' +
				'<option value="[hr][size=10]Ред.мод: [color=red]Обмен запрещен.[/color][/size]">Обмен инвайтами</option>' +
				'<option value="[hr][size=10]Ред.мод: [color=red]Продажа инвайтов запрещена.[/color][/size]">Продажа инвайтов</option>' +
			'</select>';

$('.buttons-row:first').prepend(html);

bbcode.addTag('test',  function(e) { var v=e.value; e.selectedIndex=0; return v }, '', null, null, function(text) { return ' ' });