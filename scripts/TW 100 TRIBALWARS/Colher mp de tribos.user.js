// ==UserScript==
// @name         Colher mp de tribos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include        http*://*.tribalwars.com.br/*
// @include        http*://*.die-staemme.de/*
// @grant        none
// ==/UserScript==
javascript:
if(game_data.player.premium == true) {
	UI.InfoMessage('Acesse Canal TW 100 Veja Todas Novidades', 3000, true);
	end();
}

if(game_data.screen!='info_member'){
	UI.InfoMessage('Canal Youtube:> #TW 100# Script deve ser usado na pagina de membros de uma tribo - Members of the tribe-.', 3000, true);
	end();
}

var membros = new Array();

$("#content_value table:not(:first) tr:not(:first) td:first-child").each(function() {
	membros.push($(this).text().replace(/\(.*$/,"").trim());
});

prompt("Copiar membros: Ctrl+C, Enter", membros.join(";"));