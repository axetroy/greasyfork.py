// ==UserScript==
// @name           BOOT TW 100 - FAKE OU FARM
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version        2.0 (JUN/2017)
// @grant          Publico
// @description    Script BOOT TW 100 SAQUES OTIMIZADOS  (linguagem: javascript-ECMAscript5;)
// @Realiza        OTIMIZAÇÃO VISUAL DO ASSISTENTE DE SAQUE OTIMIZANDO OS SAQUES
// @Opções         AGRUPAR POR NIVEL DE MURALHA, POR MINIMO RECURSO, MAXIMO RECURSO,INTERVALO DE SAQUES ANTERIORES, MEDIA DE SAQUE, ESCONDER ALDEAS COM POUCOS RECURSOS,ETC.
// @Utilização     NO MAPA
// @include        http*://*.die-staemme.de/*
// @include        http*://*.staemme.ch/*
// @include        http*://*.tribalwars.net/*
// @include        http*://*.tribalwars.nl/*
// @include        http*://*.plemiona.pl/*
// @include        http*://*.tribalwars.se/*
// @include        http*://*.tribos.com.pt/*
// @include        http*://*.divokekmeny.cz/*
// @include        http*://*.bujokjeonjaeng.org/*
// @include        http*://*.triburile.ro/*
// @include        http*://*.voyna-plemyon.ru/*
// @include        http*://*.fyletikesmaxes.gr/*
// @include        http*://*.tribalwars.no.com/*
// @include        http*://*.divoke-kmene.sk/*
// @include        http*://*.klanhaboru.hu/*
// @include        http*://*.tribalwars.dk/*
// @include        http*://*.plemena.net/*
// @include        http*://*.tribals.it/*
// @include        http*://*.klanlar.org/*
// @include        http*://*.guerretribale.fr/*
// @include        http*://*.guerrastribales.es/*
// @include        http*://*.tribalwars.fi/*
// @include        http*://*.tribalwars.ae/*
// @include        http*://*.tribalwars.co.uk/*
// @include        http*://*.vojnaplemen.si/*
// @include        http*://*.genciukarai.lt/*
// @include        http*://*.wartribes.co.il/*
// @include        http*://*.plemena.com.hr/*
// @include        http*://*.perangkaum.net/*
// @include        http*://*.tribalwars.jp/*
// @include        http*://*.tribalwars.bg/*
// @include        http*://*.tribalwars.asia/*
// @include        http*://*.tribalwars.us/*
// @include        http*://*.tribalwarsmasters.net/*
// @include        http*://*.tribalwars.com.br/*
// @icon           https://www.tribalwars.com.br/graphic/buildings/storage.png
// ==/UserScript==

/*	Changelog versão 2
*        Equipe do Canal Youtube TW 100 se reserva ao direito de possuir a posse do codigo-fonte  do script, quaisquer modificação deve ser solicitado via email, segundos regras da Licença Pública Geral GNU 
*        Equipe do Canal Youtube TW 100 não se responsabiliza por eventuais danos causados pela utilização do script
*        Equipe do Canal Youtube TW 100 promove a canpanha "Software livre não e virus nem boot" abraça e se solidariza com os scripts de tampermonkey voltados para o game tribal wars, do qual as equipes inesperientes de suporte, sem conhecimento, e sem saber a historia dos primordios do game, impõe um pensamento de que os script de tampermonkey são proibidos. Muitas das melhorias no game, que se deu atraves de scrips de tampermonkey.
*		 Equipe do Canal Youtube TW 100 no dia 25/06/2017 v2.0i primeira versão para atualização TW 8.89
*        Equipe do Canal Youtube TW 100 Script em desenvolvimento, ao longo do tempo, de acordo com o tempo disponivel iremos adicionar mais funções
*/

javascript:

/* SettingsAPI: ＣＡＮＡＬ ＤＯ ＹＯＵＴＵＢＥ ＴＷ 100
		-------------------------------------------------------------------------------------
		╔═══╗╔═══╗╔═╗─╔╗╔═══╗╔╗───     ╔═══╗╔═══╗     ╔╗──╔╗╔═══╗╔╗─╔╗╔════╗╔╗─╔╗╔══╗─╔═══╗     ╔════╗──────     ─╔╗─╔═══╗╔═══╗
║╔═╗║║╔═╗║║║╚╗║║║╔═╗║║║───     ╚╗╔╗║║╔═╗║     ║╚╗╔╝║║╔═╗║║║─║║║╔╗╔╗║║║─║║║╔╗║─║╔══╝     ║╔╗╔╗║──────     ╔╝║─║╔═╗║║╔═╗║
║║─╚╝║║─║║║╔╗╚╝║║║─║║║║───     ─║║║║║║─║║     ╚╗╚╝╔╝║║─║║║║─║║╚╝║║╚╝║║─║║║╚╝╚╗║╚══╗     ╚╝║║╚╝╔╗╔╗╔╗     ╚╗║─║║║║║║║║║║
║║─╔╗║╚═╝║║║╚╗║║║╚═╝║║║─╔╗     ─║║║║║║─║║     ─╚╗╔╝─║║─║║║║─║║──║║──║║─║║║╔═╗║║╔══╝     ──║║──║╚╝╚╝║     ─║║─║║║║║║║║║║
║╚═╝║║╔═╗║║║─║║║║╔═╗║║╚═╝║     ╔╝╚╝║║╚═╝║     ──║║──║╚═╝║║╚═╝║──║║──║╚═╝║║╚═╝║║╚══╗     ──║║──╚╗╔╗╔╝     ╔╝╚╗║╚═╝║║╚═╝║
╚═══╝╚╝─╚╝╚╝─╚═╝╚╝─╚╝╚═══╝     ╚═══╝╚═══╝     ──╚╝──╚═══╝╚═══╝──╚╝──╚═══╝╚═══╝╚═══╝     ──╚╝───╚╝╚╝─     ╚══╝╚═══╝╚═══╝
╔════╗──────     ─╔╗─╔═══╗╔═══╗     
║╔╗╔╗║──────     ╔╝║─║╔═╗║║╔═╗║     
╚╝║║╚╝╔╗╔╗╔╗     ╚╗║─║║║║║║║║║║     
──║║──║╚╝╚╝║     ─║║─║║║║║║║║║║     
──║║──╚╗╔╗╔╝     ╔╝╚╗║╚═╝║║╚═╝║     
──╚╝───╚╝╚╝─     ╚══╝╚═══╝╚═══╝     
███۞███████ ]▄▄▄▄▄▄▄▄▄▄▄▄▃
▂▄▅█████████▅▄▃▂
I███████████████████].
◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤...
*/
var todas_as_tropas = false;
var tropas =[20,20,0,0,0,0,0,0,0,0,0,0];
var coords_ataque = '323|600 325|605 321|601 320|601 320|604 328|606 329|605';
var acao = "ataque";

if(game_data.player.premium == true) {
	UI.InfoMessage('Para utilizar esse script é necessário uma Conta Premium!', 3000, true);
	end();
}

if(game_data.screen!='place'){
	UI.InfoMessage('Script deve ser usado na praça de reunião.', 3000, true);
	end();
}


if(typeof cookie_atk === 'undefined') var cookie_atk = "tw_br_attack";
if(typeof aviso === 'undefined') var aviso = true;
if(typeof acao === 'undefined') var acao = "ataque";
if(typeof todas_as_tropas === 'undefined') var todas_as_tropas = false;

if(document.URL.search(/try=confirm/)===-1) {
	if(typeof coords_ataque !== 'undefined') {
		function i(o, v) {
			$("input[name=" + o + "]").attr("value", v)
		}
		if($("input[name=support]").length > 0) {
			coords_ataque = coords_ataque.split(" ");
			n = $.cookie(cookie_atk);
			n == null ? n = 0 : n = parseInt(n);
			if (n >= coords_ataque.length) n = aviso ? (confirm('último ataque já foi enviado, continuar?') ? 0 : -1) : 0;
			if (n >= 0) {
				coords_ataque = coords_ataque[n].split("|");
				i("x", coords_ataque[0]);
				i("y", coords_ataque[1]);
				$.cookie(cookie_atk, n + 1, {
					expires: 10
				});
			}
		}
	}
	var i;
	var nomes = ['spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','knight','snob'];
	if(todas_as_tropas == false) {
		for(i=0; i < tropas.length;i++) {
			if(tropas[i] > 0) {
				var e = $('input#unit_input_'+nomes[i]);
				if (e[0]) {
					insertUnit(document.forms[0][nomes[i]], tropas[i])
				}
			}
		}
	} else {
		document.getElementById('selectAllUnits').click();
	}
	if(acao == "ataque")document.forms[0].attack.click();
	if(acao == "apoio")document.forms[0].support.click();
}
void(0);