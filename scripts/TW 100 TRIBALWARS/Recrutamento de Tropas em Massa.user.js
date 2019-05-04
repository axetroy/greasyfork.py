// ==UserScript==
// @name           Recrutamento de Tropas em Massa
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version        2.0 (JUN/2017;)
// @grant          Publico
// @description    Script para recrutar todos tipos de tropas da aldeia em uma unica pagina, Game tribalwars(linguagem: javascript-ECMAscript5;)
// @Realiza        Função premium de recrutamento em massa (MASS RECRUIT);
// @Opções         Canal Tw 100 deixa codigo livre, para possiveis alterações e modificações e melhoramentos;
// @Utilização     Utilizar na Visualização da aldeia (pagina inicial de jogo)
// @include        http*://*.tribalwars.com.br/*screen=overview*
// @include        http*://*.die-staemme.de/*screen=overview*
// @include        http*://*.staemme.ch/*screen=overview*
// @include        http*://*.tribalwars.net/*screen=overview*
// @include        http*://*.tribalwars.nl/*screen=overview*
// @include        http*://*.plemiona.pl/*screen=overview*
// @include        http*://*.tribalwars.se/*screen=overview*
// @include        http*://*.tribos.com.pt/*screen=overview*
// @include        http*://*.divokekmeny.cz/*screen=overview*
// @include        http*://*.bujokjeonjaeng.org/*screen=overview*
// @include        http*://*.triburile.ro/*screen=overview*
// @include        http*://*.voyna-plemyon.ru/*screen=overview*
// @include        http*://*.fyletikesmaxes.gr/*screen=overview*
// @include        http*://*.tribalwars.no.com/*screen=overview*
// @include        http*://*.divoke-kmene.sk/*screen=overview*
// @include        http*://*.klanhaboru.hu/*screen=overview*
// @include        http*://*.tribalwars.dk/*screen=overview*
// @include        http*://*.plemena.net/*screen=overview*
// @include        http*://*.tribals.it/*screen=overview*
// @include        http*://*.klanlar.org/*screen=overview*
// @include        http*://*.guerretribale.fr/*screen=overview*
// @include        http*://*.guerrastribales.es/*screen=overview*
// @include        http*://*.tribalwars.fi/*screen=overview*
// @include        http*://*.tribalwars.ae/*screen=overview*
// @include        http*://*.tribalwars.co.uk/*screen=overview*
// @include        http*://*.vojnaplemen.si/*screen=overview*
// @include        http*://*.genciukarai.lt/*screen=overview*
// @include        http*://*.wartribes.co.il/*screen=overview*
// @include        http*://*.plemena.com.hr/*screen=overview*
// @include        http*://*.perangkaum.net/*screen=overview*
// @include        http*://*.tribalwars.jp/*screen=overview*
// @include        http*://*.tribalwars.bg/*screen=overview*
// @include        http*://*.tribalwars.asia/*screen=overview*
// @include        http*://*.tribalwars.us/*screen=overview*
// @include        http*://*.tribalwarsmasters.net/*screen=overview*
// ==/UserScript==

/*	Changelog versão 2
*        Equipe do Canal Youtube TW 100 se reserva ao direito de possuir a posse do codigo-fonte  do script, quaisquer modificação deve ser solicitado via email, segundos regras da Licença Pública Geral GNU 
*        Equipe do Canal Youtube TW 100 não se responsabiliza por eventuais danos causados pela utilização do script
*        Equipe do Canal Youtube TW 100 promove a canpanha "Software livre não e virus nem boot" abraça e se solidariza com os scripts de tampermonkey voltados para o game tribal wars, do qual as equipes inesperientes de suporte, sem conhecimento, e sem saber a historia dos primordios do game, impõe um pensamento de que os script de tampermonkey são proibidos. Esse Script Recrutamento em massa que hoje existe no game tribal wars para quem, possue conta premium, foi criado por players do game em 2009, e absorvido pelo jogo em 2013, assim como diversas outras criações, e melhorias no game, que se deu atraves do aplicativo e scrips de tampermonkey.
*		25/06/2017 v2.0i primeira versão para atualização TW 8.89
*/

(function(){
	var settings = {
		"version" : "2.0",
		"units"		: {"spear"		:	{"name" : "Lanceiro",					"img" : "unit_spear.png?1",			"own" : 0,	"in_village" : 0},
								 "sword"		: {"name" : "Espadachin",				"img" : "unit_sword.png?1",			"own" : 0,	"in_village" : 0},
								 "axe"			: {"name" : "Barbaro",					"img" : "unit_axe.png?1",				"own" : 0,	"in_village" : 0},
								 "archer"		: {"name" : "Arqueiro",					"img" : "unit_archer.png?1",		"own" : 0,	"in_village" : 0},
								 "spy"			: {"name" : "Explorador",						"img" : "unit_spy.png?1",				"own" : 0,	"in_village" : 0},
								 "light"		: {"name" : "Cavalaria Leve",			"img" : "unit_light.png?1",			"own" : 0,	"in_village" : 0},
								 "marcher"	: {"name" : "Arqueiro a Cavalo",	"img" : "unit_marcher.png?1",		"own" : 0,	"in_village" : 0},
								 "heavy"		: {"name" : "Cavalaria pesada",			"img" : "unit_heavy.png?1",			"own" : 0,	"in_village" : 0},
								 "ram"			:	{"name" : "Ariete",									"img" : "unit_ram.png?1",				"own" : 0,	"in_village" : 0},
								 "catapult"	: {"name" : "Catapulta",							"img" : "unit_catapult.png?1",	"own" : 0,	"in_village" : 0},
								 "knight"		: {"name" : "Paladino",								"img" : "unit_knight.png?1",		"own" : 0,	"in_village" : 0},
								 "snob"			: {"name" : "Nobre",							"img" : "unit_snob.png?1",			"own" : 0,	"in_village" : 0},
								 "militia"	: {"name" : "Milicia",					"img" : "unit_militia.png?1",		"own" : 0,	"in_village" : 0}
		}
	},
	units_available = new Array(),
	Sangu;
	($("a[href$='changeStatus=false']").length != 0 ? Sangu = true : Sangu = false);
	if (!localStorage.Tuam_units_at_world) {
		var xmlhttp=new XMLHttpRequest();
		var url = 'https://'+location.host+'/interface.php?func=get_unit_info';
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var unit_data=xmlhttp.responseXML;
				unit_data = unit_data.getElementsByTagName('config')[0].children;
				for (var i = 0; i < unit_data.length; i++){
					units_available.push(unit_data[i].nodeName);
				}
				localStorage.Tuam_units_at_world = units_available;
			}
		}
	}
	else if (Sangu != true){ // cancela o script se o Sangu estiver ativo
		units_available = localStorage.Tuam_units_at_world.split(','); // carregando as configurações mundiais das unidades disponíveis
		var units_td = $('#show_units').find('tbody').find('td');
		var units_amount = units_td.find('strong'); // quantidade de unidades disponíveis na aldeia -> units_amount[0].innerHTML

		function split_units(url) {
			var xmlhttp;
			xmlhttp=new XMLHttpRequest();
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					var xml_doc = xmlhttp.responseText;
					var unit_string = xml_doc.split('<a href="javascript:insertUnit($(\'#unit_input_');
					for (var i = 1; i < unit_string.length; i++) {
						var unit_name = unit_string[i].split('\'),')[0];
						var own_unit = unit_string[i].split('(')[1].split(')')[0];
						settings.units[unit_name].own = own_unit; // carregando unidades próprias
					}
					$('#show_units').find('h4')[0].innerHTML = 'TW 100';
						var units_img = units_td.find('img');//units_img[1].src
						for (var i = 0; i < units_img.length; i++){ // carregar unidades disponíveis em configurações
							var current_unit = units_img[i].src.split('unit_')[1].split('.png')[0];
							(units_amount[i].innerHTML ? settings.units[current_unit].in_village = units_amount[i].innerHTML : settings.units[current_unit].in_village = 1);
							(settings.units[current_unit].own > 0 ? units_amount[i].innerHTML = settings.units[current_unit].own : units_amount[i].parentNode.style.display = 'none');
						}
					$('#show_units').find('h4').clone().appendTo('#show_units');
					$('#show_units').find('h4')[1].innerHTML = 'Unidades Na Aldeia';
					$('#show_units').find('div').clone().appendTo('#show_units'); // cria nova tabela para unidades de  apoio
					$('#show_units').find('tbody')[1].innerHTML = '';
					for (var i = 0; i < units_available.length-1; i++){
						if (settings.units[units_available[i]].in_village - settings.units[units_available[i]].own != 0 /*&& own_units[i]*/){
							var multi = '';
							if (settings.units[units_available[i]].in_village - settings.units[units_available[i]].own > 0){
								switch (settings.units[units_available[i]].name){
									case'Cavalria Leve':case'Cavalaria pesada':break;
									case'Ariete':multi = 'men';break;
									case'Catapulta':multi = 'en';break;
									case'Nobre':multi = 'nen';break;
									default:multi = 's';
								}
							}
							$('#show_units').find('tbody')[1].innerHTML += '<tr><td><img src="https://cdn2.tribalwars.net/graphic/unit/' + settings.units[units_available[i]].img + '" alt=""/> <strong>' + (settings.units[units_available[i]].in_village -settings.units[units_available[i]].own) + '</strong> ' + settings.units[units_available[i]].name + multi + '</td></tr>';
						}
					}
				}
			}
			xmlhttp.open("GET",url,true);
			xmlhttp.send();
		}
		
		var url = document.URL.replace('overview','place');
		split_units(url);
	}
})()