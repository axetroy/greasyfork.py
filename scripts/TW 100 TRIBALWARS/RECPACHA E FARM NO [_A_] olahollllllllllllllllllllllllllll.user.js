// ==UserScript==
// @name RECPACHA E FARM NO [_A_] olahollllllllllllllllllllllllllll
// @author Eu Sou Um DEUS
// @email sodeussabe@gmail.com
// @namespace https://www.fmedeiros.com.br
// @version 2.1 (JUL/2017;)
// @grant Publico
// @description Script facilitador de saques para Tribal Wars, com alerta sonoro para captcha.
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
// ==/UserScript==

var botProtect = $('body').data('bot-protect');
if (document.URL.indexOf('screen=am_farm') == -1)
	console.log('Você deve executar o script no assistente de farm!');
else if (botProtect !== undefined) {
	alert('Olha a merda do captcha aê parceiro!');
	$("<audio id='audio' autoplay><source src='http://protettordelinks.com/wp-content/baixar/bomba_relogio_alerta_www.toquesengracadosmp3.com.mp3' type='audio/mp3' /></audio>").appendTo("body");
} else if (game_data.player.farm_manager !== true)
	alert('Você não tem Assistente de Saque!');
else {
	var x				= 1,				// NÃO ALTERAR!
		menu			= $('#am_widget_Farm a.farm_icon_a'),
		tempo			= 500,				// Tempo em milesegundos
		minhaVar		= "",				// NÃO ALTERAR!
		altAldTempo		= true,				// Tempo em milesegundos para alternar as aldeias (Use 'true' para aleatório)
		atualizarPagina	= false,			// Atualizar a página automaticamente? ('true' = SIM, 'false' = NÃO)
		boxCaptcha		= $("#bot_check");	// NÃO ALTERAR!

	var aleatorio = function(superior, inferior) {
		var numPosibilidades	= superior - inferior,
			aleat				= Math.random() * numPosibilidades;

		return Math.round(parseInt(inferior) + aleat);
	};

	$('img').each(function() {
		var tempStr = $(this).attr('src');
		if (tempStr.indexOf('attack') != -1)
			$(this).addClass('tooltip');
	});

	if (atualizarPagina === true) {
		setInterval(function() {
			window.location.reload();
		}, 60000);
	}

	if (altAldTempo === true)
		altAldTempo = aleatorio(5000, 10000);
	else
		altAldTempo = parseInt(altAldTempo) + parseInt(aleatorio(500, 1000));

	for (i = 0; i < 50; i++) {
		$(menu).eq(i).each(function() {
			if (!($(this).parent().parent().find('img.tooltip').length)) {
				var tempoAgora = tempo * x;
				setTimeout(function(minhaVar) {
					$(minhaVar).click();
				}, tempoAgora, this);

				++x;
			}
		});
	}

	var altVillage = setInterval(function () {
		$('.arrowRight, .groupRight').click();

		clearInterval(altVillage);
	}, altAldTempo);

	var checkCaptcha = setInterval(function() {
		if (boxCaptcha.length) {
			$("<audio id='audio' autoplay><source src='http://protettordelinks.com/wp-content/baixar/bomba_relogio_alerta_www.toquesengracadosmp3.com.mp3' type='audio/mp3' /></audio>").appendTo("body");
			alert('Olha a merda do captcha aê parceiro!');

			clearInterval(checkCaptcha);
			clearInterval(altVillage);
		}
	}, 100);
}