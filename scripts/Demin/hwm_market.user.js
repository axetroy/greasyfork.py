﻿// ==UserScript==
// @name           hwm_market
// @author         Demin
// @namespace      Demin
// @description    Реальная стоимость лотов на рынке, прибыль с покупки (by Demin)
// @homepage       https://greasyfork.org/users/1602-demin
// @icon           http://i.imgur.com/LZJFLgt.png
// @version        7.4
// @encoding 	   utf-8
// @include        http://www.heroeswm.ru/auction.php*
// @include        http://qrator.heroeswm.ru/auction.php*
// @include        http://178.248.235.15/auction.php*
// @include        http://www.lordswm.com/auction.php*
// @exclude        */rightcol.php*
// @exclude        */ch_box.php*
// @exclude        */chat*
// @exclude        */ticker.html*
// @exclude        */frames*
// @exclude        */brd.php*
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_openInTab
// ==/UserScript==

// (c) 2009-2015, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

(function() {

var version = '7.4';


if (typeof GM_deleteValue != 'function') {
	this.GM_getValue=function (key,def) {return localStorage[key] || def;};
	this.GM_setValue=function (key,value) {return localStorage[key]=value;};
	this.GM_deleteValue=function (key) {return delete localStorage[key];};
}


var script_num = 130571;
var script_name = "hwm_market: Реальная стоимость лотов на рынке, прибыль с покупки (by Demin)";
update_n(version,script_num,script_name);

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';


var parent_table = document.querySelector("form[name='sort']");
if ( parent_table ) {
while ( parent_table.tagName != 'TR' ) { parent_table = parent_table.parentNode; }

var array_arts;
add_array_arts();

var check_vashi_tovary; // vashi tovary
var check_mass = JSON.parse( GM_getValue('130571_check_mass', '[]') );
var check_tolko_pribyl = check_mass[0]; // skryvat' arty s otricatel'noj pribyl'ju
var check_tolko_gos = check_mass[1]; // skryvat' ne gos arty
var check_tolko_zelye = check_mass[2]; // tol'ko celye arty


if ( url.match('lordswm') ) {

var str1 = 'Hiding arts with negative profits.';
var str2 = 'Only profit';
var str3 = 'Will show full durability arts. Options <only profit> and <only shops arts> turn off to deselect.';
var str4 = 'Full durability';
var str5 = 'Hiding not a shop arts.';
var str6 = 'Only shops arts';
var str7 = 'Time taken to process the page.';
var str8 = 'Cost per battle: ';

} else {

var str1 = 'Скрываются арты с отрицательной прибылью.';
var str2 = 'Только прибыль';
var str3 = 'Будут показаны только целые арты. Опции <только прибыль> и <только гос арты> отключатся до снятия галки.';
var str4 = 'Только целые';
var str5 = 'Скрываются не магазинные арты.';
var str6 = 'Только гос арты';
var str7 = 'Время затраченное на обработку страницы.';
var str8 = '\u0426\u0435\u043D\u0430 \u0437\u0430 \u0431\u043E\u0439: ';

}


var menu = parent_table.nextSibling;

//menu.childNodes[0].width = "340px";
menu.childNodes[0].innerHTML = '<label for=check_tolko_pribyl1 style="cursor:pointer;" title="' + str1 + '"><input type=checkbox ' + (check_tolko_pribyl==1?'checked':'') + ' id=check_tolko_pribyl1>' + str2 + '</label>\xA0<label for=check_tolko_zelye1 style="cursor:pointer;" title="' + str3 + '"><input type=checkbox ' + (check_tolko_zelye==1?'checked':'') + ' id=check_tolko_zelye1>' + str4 + '</label><br>' +
'<label for=check_tolko_gos1 style="cursor:pointer;" title="' + str5 + '"><input type=checkbox ' + (check_tolko_gos==1?'checked':'') + ' id=check_tolko_gos1>' + str6 + '</label>';
//menu.childNodes[1].align = "left";
//menu.childNodes[1].innerHTML = '';
//menu.childNodes[2].innerHTML = '';
menu.childNodes[4].innerHTML = '<span id=time_ex title="' + str7 + '">0 ms</span><br>' +
'by <a href="pl_info.php?id=15091">Demin</a> <a href="javascript:void(0);" id="open_transfer_id">?</a>';

addEvent($("check_tolko_pribyl1"), "click", app_filter);
addEvent($("check_tolko_gos1"), "click", app_filter);
addEvent($("check_tolko_zelye1"), "click", app_filter);
addEvent($("open_transfer_id"), "click", open_transfer_f);


parent_table = parent_table.parentNode.childNodes;
var parent_table_len = parent_table.length;

// vashi tovary
if ( !parent_table[2].childNodes[2] ) check_vashi_tovary = 1;

app_filter();

}


function app_filter() {

var time_log = new Date().getTime();

if ( $('check_tolko_pribyl1').checked==true ) check_tolko_pribyl = 1; else check_tolko_pribyl = 0;
if ( $('check_tolko_gos1').checked==true ) check_tolko_gos = 1; else check_tolko_gos = 0;
if ( $('check_tolko_zelye1').checked==true ) check_tolko_zelye = 1; else check_tolko_zelye = 0;
check_mass = [check_tolko_pribyl, check_tolko_gos, check_tolko_zelye];
GM_setValue( "130571_check_mass", JSON.stringify(check_mass) );

var price_regexp = /<td>(\d*),?(\d*),?(\d+)<\/td>/; // price, 5,500,500
var parent, parent_art_id, insert, add_elem, lot_link, lot_id, lot_id_old, arts_id, now_art, proch, price, price_bliz, arts_cost_proch, sebes_arta, pribyl, pribyl_na_boj, color;

for ( var i=2; i<parent_table_len; i++ )
{

parent = parent_table[i];
parent_art_id = parent.querySelector("a[href^='art_info.php?id=']");
if ( !parent_art_id ) continue;

lot_link = parent.querySelector("a[href^='auction_lot_protocol.php?id=']");
lot_id = /id=(\w+)/.exec( lot_link )[1];
if ( lot_id == lot_id_old ) continue; else lot_id_old = lot_id;

// tolko_zelye
if ( check_tolko_zelye==1 ) {
	proch = /: (\d+)\/(\d+)/.exec( parent_art_id.innerHTML );
	if ( ( proch[1]==proch[2] && Number(proch[2])>9 ) || check_vashi_tovary==1 ) {
		style_ex(parent, lot_link);
		parent.style.display = '';

		if ( color == 1 ) { color = 0; parent.setAttribute('bgcolor', '#eeeeee'); }
			else { color = 1; parent.setAttribute('bgcolor', '#ffffff'); }

	}
	else { parent.style.display = 'none'; continue; }
}

arts_id = /id=(\w+)/.exec( parent_art_id )[1];
if ( !array_arts[arts_id] ) {
	if ( check_tolko_zelye!=1 ) {
		if ( check_vashi_tovary!=1 && check_tolko_gos==1 ) {
			parent.style.display = 'none';
		} else {
			style_ex(parent, lot_link);
			parent.style.display = '';

			if ( color == 1 ) { color = 0; parent.setAttribute('bgcolor', '#eeeeee'); }
				else { color = 1; parent.setAttribute('bgcolor', '#ffffff'); }

		}
	}
	continue;
}

now_art = array_arts[arts_id];

proch = /: (\d+)\/(\d+)/.exec( parent_art_id.innerHTML );

price = price_regexp.exec( parent.childNodes[2].innerHTML );
price = Number( price[1] + price[2] + price[3] );

if ( now_art[5] == 0 ) {
	arts_cost_proch = ( Math.floor( now_art[4] * 0.97 ) / now_art[3] );
} else {
	arts_cost_proch = now_art[5];
}

sebes_arta = Math.round( arts_cost_proch * Number(proch[1]) );
pribyl = sebes_arta - price;

if ( check_tolko_zelye!=1 ) {
	if ( pribyl<0 && check_vashi_tovary!=1 && check_tolko_pribyl==1 ) { parent.style.display = 'none'; continue; }
	else {
		parent.style.display = '';

		if ( color == 1 ) { color = 0; parent.setAttribute('bgcolor', '#eeeeee'); }
			else { color = 1; parent.setAttribute('bgcolor', '#ffffff'); }

	}
}

pribyl_na_boj = Math.floor( pribyl / Number(proch[1]) );

price_bliz = price_regexp.exec( parent.childNodes[1].innerHTML );
if ( price_bliz ) price_bliz = Number( price_bliz[1] + price_bliz[2] + price_bliz[3] );

style_ex(parent, lot_link);

if ( parent.id != 'check_style_ex2' ) {

	parent.id = 'check_style_ex2';

	// bliz zena
	if ( price_bliz && price_bliz <= sebes_arta ) parent.childNodes[1].setAttribute('style','background-color: #FFC6C6;');

	insert = parent.querySelectorAll("a[href^='auction_lot_protocol.php?id=']");
	if ( insert[1] ) insert = insert[1].parentNode.nextSibling;
		else insert = insert[0].parentNode.nextSibling;

	add_elem = document.createElement('table');
	add_elem.style.width = '250px';
	add_elem.title = str8 + arts_cost_proch.toFixed(2);

	if ( pribyl > -1 ) {
		add_elem.innerHTML = '<tbody><tr><td align="left" width="30%"><b>' + sebes_arta + '</b></td><td align="center" width="30%">(' + pribyl_na_boj + ')</td><td align="center" width="40%"><b><font color="blue">' + pribyl + 		'</font></b></td></tr></tbody>';
	} else {
		add_elem.innerHTML = '<tbody><tr><td align="left" width="30%">' + sebes_arta + '</td><td align="center" width="30%">' + pribyl + '</td><td align="center" width="40%"> </td></tr></tbody>';
	}

	// add info
	insert.parentNode.insertBefore(add_elem, insert);

	// remove <br> after table
	insert.parentNode.removeChild( insert );
}

}

$('time_ex').innerHTML = ( new Date().getTime() - time_log ) + " ms";

}


function style_ex(parent, lot_link) {
if ( !parent.id ) {

	parent.id = 'check_style_ex';

	// udalenie " - " pered naimenovaniem arta i udalenie perenosa "3 shtuk"
	lot_link.parentNode.innerHTML = lot_link.parentNode.innerHTML.replace(" - ", "").replace("<br><b>", " - <b>");
	// remove link to lot
	lot_link = parent.querySelector("a[href^='auction_lot_protocol.php?id=']");
	lot_link.parentNode.removeChild( lot_link );

	// remove bgcolor
	var get_bgcolor = parent.childNodes[4].getAttribute('bgcolor');
	if ( get_bgcolor=="#eeeeee" || get_bgcolor=="#ffffff" ) parent.childNodes[4].removeAttribute('bgcolor');
}
}

function open_transfer_f()
{
	if ( location.href.match('lordswm') )
	{
		window.location = "transfer.php?nick=demin&shortcomment=Transferred 10000 Gold 5 Diamonds";
	} else {
		window.location = "transfer.php?nick=demin&shortcomment=%CF%E5%F0%E5%E4%E0%ED%EE%2010000%20%C7%EE%EB%EE%F2%EE%205%20%C1%F0%E8%EB%EB%E8%E0%ED%F2%FB";
	}
}

function add_array_arts()
{
array_arts = {'id arta':['naimenovanie, ssylka na kategoriyu, ssylka na izobrazenie, prochnost, stoimost pokupki v magazine, stoimost prochnosti (esli art prodaetsya tolko v magazine), oa, uroven'],'Generated by Demin script hwm_shop_get_array':['please save copyright'],'wood_sword':['Деревянный меч', 'weapon', 'woodensword', 7, 140, 20.00, 1, 1],'gnome_hammer':['Легкий топорик', 'weapon', 'onehandaxe', 25, 310, 0, 2, 2],'steel_blade':['Стальной клинок', 'weapon', 'steelsword', 30, 490, 0, 2, 3],'dagger':['Кинжал мести', 'weapon', 'dagger', 30, 960, 32.00, 1, 3],'def_sword':['Меч расправы', 'weapon', 'def_sword', 40, 1360, 0, 3, 3],'shortbow':['Короткий лук', 'weapon', 'shortbow', 20, 360, 0, 1, 4],'staff':['Боевой посох ', 'weapon', 'staff', 40, 2660, 0, 6, 5],'requital_sword':['Меч возмездия', 'weapon', 'requitalsword', 40, 2660, 0, 5, 5],'broad_sword':['Меч равновесия', 'weapon', 'broadsword', 60, 4970, 0, 6, 6],'long_bow':['Длинный лук', 'weapon', 'long_bow', 50, 6650, 0, 4, 6],'sor_staff':['Посох могущества', 'weapon', 'sor_staff', 50, 6440, 0, 8, 7],'power_sword':['Меч власти', 'weapon', 'power_sword', 80, 10290, 0, 8, 7],'mstaff8':['Посох весны', 'weapon', 'mstaff8', 30, 3040, 0, 8, 8],'ssword8':['Меч жесткости', 'weapon', 'ssword8', 40, 4040, 0, 8, 8],'mif_staff':['Мифриловый посох', 'weapon', 'mif_staff', 70, 17250, 0, 9, 9],'mif_sword':['Мифриловый меч', 'weapon', 'mif_sword', 70, 17850, 0, 9, 9],'mstaff10':['Посох теней', 'weapon', 'mstaff10', 35, 3980, 113.71, 9, 10],'ssword10':['Меч отваги', 'weapon', 'ssword10', 45, 5110, 0, 9, 10],'energy_scroll':['Свиток энергии', 'weapon', 'energy_scroll', 70, 9520, 0, 6, 10],'composite_bow':['Составной лук', 'weapon', 'composite_bow', 55, 8680, 0, 5, 11],'mm_staff':['Рубиновый посох', 'weapon', 'mm_staff', 70, 17880, 0, 10, 12],'mm_sword':['Рубиновый меч', 'weapon', 'mm_sword', 70, 18100, 0, 10, 12],'mstaff13':['Обсидиановый посох', 'weapon', 'mstaff13', 40, 5050, 0, 10, 13],'ssword13':['Обсидиановый меч', 'weapon', 'ssword13', 50, 6300, 0, 10, 13],'bow14':['Лук полуночи', 'weapon', 'bow14', 65, 10470, 0, 6, 14],'ffstaff15':['Посох повелителя огня', 'weapon', 'ffstaff15', 70, 18610, 0, 11, 15],'firsword15':['Меч возрождения', 'weapon', 'firsword15', 70, 18600, 0, 11, 15],'smstaff16':['Посох забвения', 'weapon', 'ssmstaff16', 37, 5140, 0, 11, 16],'ssword16':['Меч гармонии', 'weapon', 'szzsword16', 46, 6370, 0, 11, 16],'bow17':['Лук рассвета', 'weapon', 'bbobow17', 65, 10640, 163.69, 7, 17],'staff18':['Посох затмения', 'weapon', 'smmstaff18', 70, 18680, 266.86, 12, 18],'scroll18':['Манускрипт концентрации', 'weapon', 'shhscroll18', 70, 10850, 155.00, 9, 18],'sword18':['Гладий предвестия', 'weapon', 'smasword18', 70, 18690, 267.00, 12, 18],'leatherhat':['Кожаная шляпа', 'helm', 'leatherhat', 12, 180, 15.00, 1, 1],'leather_helm':['Кожаный шлем', 'helm', 'leatherhelmet', 30, 660, 0, 1, 3],'knowledge_hat':['Шляпа знаний', 'helm', 'knowlengehat', 25, 1030, 0, 2, 5],'chain_coif':['Кольчужный шлем', 'helm', 'chaincoif', 40, 1620, 0, 2, 5],'wizard_cap':['Колпак мага', 'helm', 'magehat', 35, 1680, 0, 2, 5],'mage_helm':['Шлем мага', 'helm', 'mage_helm', 50, 3450, 0, 4, 7],'steel_helmet':['Стальной шлем', 'helm', 'steel_helmet', 70, 3870, 0, 3, 7],'shelm8':['Шлем отваги', 'helm', 'shelm8', 30, 1260, 0, 3, 8],'mif_lhelmet':['Лёгкий мифриловый шлем', 'helm', 'mif_lhelmet', 70, 5520, 0, 5, 9],'mif_hhelmet':['Тяжёлый мифриловый шлем', 'helm', 'mif_hhelmet', 70, 6630, 0, 5, 11],'shelm12':['Рубиновый шлем', 'helm', 'shelm12', 40, 2800, 0, 5, 12],'mhelmetzh13':['Корона чернокнижника', 'helm', 'mhelmetzh13', 70, 6720, 0, 6, 13],'zxhelmet13':['Обсидиановый шлем', 'helm', 'zxhelmet13', 70, 6720, 0, 6, 13],'myhelmet15':['Шлем пламени', 'helm', 'myhelmet15', 70, 6930, 0, 7, 15],'xymhelmet15':['Корона пламенного чародея', 'helm', 'xymhelmet15', 70, 6960, 0, 7, 15],'shelm16':['Шлем благородства', 'helm', 'umshelm16', 40, 2920, 0, 7, 16],'helmet17':['Шлем рассвета', 'helm', 'hwmhelmet17', 70, 7620, 108.86, 8, 17],'mhelmet17':['Шлем сумерек', 'helm', 'miqmhelmet17', 70, 7620, 108.86, 8, 17],'bravery_medal':['Медаль отваги', 'necklace', 'braverymedal', 25, 590, 0, 2, 2],'amulet_of_luck':['Амулет удачи', 'necklace', 'lucknecklace', 25, 1010, 0, 2, 3],'power_pendant':['Кулон отчаяния', 'necklace', 'power_pendant', 60, 7770, 0, 7, 7],'samul8':['Счастливая подкова', 'necklace', 'samul81', 30, 3570, 0, 7, 8],'warrior_pendant':['Кулон воина', 'necklace', 'warrior_pendant', 50, 8470, 0, 8, 10],'magic_amulet':['Магический амулет', 'necklace', 'magic_amulet', 50, 8820, 0, 7, 10],'wzzamulet13':['Амулет ярости', 'necklace', 'wzzamulet13', 60, 10500, 0, 9, 13],'mmzamulet13':['Мистический амулет', 'necklace', 'mmzamulet13', 60, 10500, 0, 9, 13],'smamul14':['Осколок тьмы', 'necklace', 'smamul14', 30, 4600, 0, 9, 14],'samul14':['Амулет фортуны', 'necklace', 'samul141', 30, 4600, 0, 9, 14],'bafamulet15':['Амулет трёх стихий', 'necklace', 'bafamulet15', 65, 11380, 0, 9, 15],'mmzamulet16':['Амулет духа', 'necklace', 'mmzamulet16', 65, 11550, 0, 10, 16],'wzzamulet16':['Амулет битвы', 'necklace', 'wzzamulet16', 65, 11550, 0, 10, 16],'samul17':['Оскал дракона', 'necklace', 'warsamul17', 30, 4620, 154.00, 10, 17],'smamul17':['Амулет единения', 'necklace', 'sekmamul17', 30, 4620, 154.00, 10, 17],'mamulet19':['Кулон непостижимости', 'necklace', 'megmamulet19', 65, 11620, 178.77, 11, 19],'amulet19':['Кулон рвения', 'necklace', 'nwamulet19', 65, 11620, 178.77, 11, 19],'leather_shiled':['Кожаная броня', 'cuirass', 'leathershield', 18, 280, 0, 1, 1],'leatherplate':['Кожаные доспехи', 'cuirass', 'leatherplate', 30, 1430, 0, 2, 3],'hauberk':['Боевая кольчуга', 'cuirass', 'chainarmor', 40, 2410, 0, 3, 5],'ciras':['Стальная кираса', 'cuirass', 'ciras', 70, 4690, 0, 4, 7],'mage_armor':['Одеяние мага', 'cuirass', 'mage_armor', 50, 4700, 0, 5, 8],'mif_light':['Лёгкая мифриловая кираса', 'cuirass', 'mif_light', 70, 6580, 0, 5, 8],'sarmor9':['Мифриловая кольчуга', 'cuirass', 'sarmor9', 40, 2610, 0, 5, 9],'full_plate':['Стальные доспехи', 'cuirass', 'full_plate', 75, 9730, 0, 6, 10],'wiz_robe':['Роба чародея', 'cuirass', 'mage_robes', 70, 9870, 0, 7, 11],'miff_plate':['Мифриловые доспехи', 'cuirass', 'miff_plate', 75, 10360, 0, 7, 12],'sarmor13':['Обсидиановая броня', 'cuirass', 'sarmor13', 50, 4550, 0, 7, 13],'robewz15':['Роба пламенного чародея', 'cuirass', 'robewz15', 70, 9800, 0, 8, 15],'armor15':['Доспех пламени', 'cuirass', 'armor15', 70, 9800, 0, 8, 15],'sarmor16':['Кираса благородства', 'cuirass', 'brsarmor16', 44, 4580, 0, 8, 16],'marmor17':['Доспехи сумерек', 'cuirass', 'mammarmor17', 70, 9800, 140.00, 9, 17],'armor17':['Кираса рассвета', 'cuirass', 'anwarmor17', 70, 9990, 142.71, 9, 17],'scoutcloack':['Плащ разведчика', 'cloack', 'cloack', 20, 320, 0, 1, 4],'soul_cape':['Накидка духов', 'cloack', 'soulcape', 30, 1260, 0, 2, 5],'antiair_cape':['Халат ветров', 'cloack', 'antiair_cape', 60, 3080, 0, 3, 6],'powercape':['Плащ магической силы', 'cloack', 'powercape', 40,
 5620, 0, 4, 8],'scloack8':['Маскировочный плащ', 'cloack', 'scloack8', 30, 2160, 0, 4, 8],'antimagic_cape':['Халат магической защиты', 'cloack', 'antimagic_cape', 50, 5210, 0, 5, 8],'wiz_cape':['Накидка чародея', 'cloack', 'wiz_cape', 60, 9170, 0, 7, 12],'cloackwz15':['Мантия пламенного чародея', 'cloack', 'cloackwz15', 65, 10120, 0, 8, 15],'scloack16':['Плащ драконьего покрова', 'cloack', 'mascloack16', 30, 3360, 0, 8, 16],'cloack17':['Мантия вечности', 'cloack', 'clscloack17', 65, 10500, 161.54, 9, 17],'round_shiled':['Круглый щит', 'shield', 'roundshield', 7, 110, 15.71, 1, 1],'s_shield':['Стальной щит', 'shield', 's_shield', 15, 280, 0, 2, 2],'defender_shield':['Щит хранителя', 'shield', 'protectshield', 40, 1190, 0, 3, 4],'sshield5':['Щит славы', 'shield', 'sshield5', 40, 3040, 0, 4, 5],'dragon_shield':['Щит драконов', 'shield', 'dragon_shield', 70, 9240, 0, 5, 7],'large_shield':['Башенный щит', 'shield', 'large_shield', 70, 10080, 0, 6, 10],'sshield11':['Щит сокола', 'shield', 'sshield11', 40, 4080, 0, 6, 11],'shield13':['Обсидиановый щит', 'shield', 'shield13', 70, 10710, 0, 7, 13],'sshield14':['Щит чешуи дракона', 'shield', 'zpsshield14', 38, 4130, 0, 7, 14],'shield16':['Щит пламени', 'shield', 'shield16', 70, 10840, 0, 8, 16],'sshield17':['Щит подавления', 'shield', 'esshield17', 35, 4230, 120.86, 8, 17],'shield19':['Щит рассвета', 'shield', 'sioshield19', 70, 11020, 157.43, 9, 19],'leatherboots':['Кожаные ботинки', 'boots', 'leatherboots', 14, 210, 0, 1, 1],'hunter_boots':['Кожаные сапоги', 'boots', 'hunterboots', 30, 960, 0, 1, 4],'boots2':['Боевые сапоги', 'boots', 'boots2', 35, 1080, 0, 2, 5],'shoe_of_initiative':['Туфли стремления', 'boots', 'initboots', 40, 2510, 0, 3, 5],'steel_boots':['Стальные сапоги', 'boots', 'steel_boots', 70, 6090, 0, 4, 7],'mif_lboots':['Лёгкие мифриловые сапоги', 'boots', 'mif_lboots', 55, 7530, 0, 6, 8],'sboots9':['Солдатские сапоги ', 'boots', 'sboots9', 30, 2250, 0, 5, 9],'mif_hboots':['Тяжёлые мифриловые сапоги', 'boots', 'mif_hboots', 65, 8160, 0, 6, 11],'sboots12':['Рубиновые сапоги', 'boots', 'sboots12', 35, 3150, 0, 6, 12],'wiz_boots':['Туфли чародея', 'boots', 'wiz_boots', 65, 8430, 0, 6, 12],'boots13':['Обсидиановые сапоги', 'boots', 'boots13', 70, 8950, 0, 7, 13],'mboots14':['Сапоги чернокнижника', 'boots', 'mboots14', 70, 9290, 0, 8, 14],'boots15':['Сапоги пламени', 'boots', 'boots15', 70, 9010, 0, 8, 15],'sboots16':['Сапоги благородства', 'boots', 'nmsboots16', 30, 3410, 0, 8, 16],'boots17':['Сапоги рассвета', 'boots', 'bzbboots17', 70, 9140, 130.57, 9, 17],'mboots17':['Сапоги сумерек', 'boots', 'macmboots17', 70, 9140, 130.57, 9, 17],'i_ring':['Кольцо ловкости', 'ring', 'i_ring', 10, 180, 0, 1, 2],'sring4':['Кольцо силы', 'ring', 'sring4', 15, 610, 0, 2, 4],'doubt_ring':['Кольцо сомнений', 'ring', 'necroring', 12, 1120, 0, 2, 4],'verve_ring':['Перстень вдохновения', 'ring', 'eaglering', 18, 1660, 0, 2, 4],'rashness_ring':['Кольцо стремительности', 'ring', 'hastering', 30, 2030, 0, 2, 5],'circ_ring':['Кольцо отречения', 'ring', 'circ_ring', 50, 6850, 0, 4, 6],'powerring':['Кольцо пророка', 'ring', 'powerring', 40, 5460, 0, 4, 7],'smring10':['Кольцо молнии', 'ring', 'smring10', 30, 3010, 100.33, 5, 10],'sring10':['Терновое кольцо', 'ring', 'sring10', 30, 3010, 0, 5, 10],'warriorring':['Кольцо воина', 'ring', 'warriorring', 40, 7050, 0, 5, 10],'darkring':['Кольцо теней', 'ring', 'darkring', 50, 8820, 0, 5, 10],'magring13':['Печать заклинателя', 'ring', 'magring13', 60, 10820, 0, 6, 13],'warring13':['Глаз дракона', 'ring', 'warring13', 60, 10820, 0, 6, 13],'bring14':['Кольцо противоречий', 'ring', 'bring14', 60, 10920, 0, 6, 14],'wwwring16':['Кольцо боли', 'ring', 'wwwring16', 65, 11830, 0, 6, 16],'mmmring16':['Кольцо звёзд', 'ring', 'mmmring16', 65, 11830, 0, 6, 16],'smring17':['Печать единения', 'ring', 'masmring17', 30, 3060, 102.00, 6, 17],'sring17':['Кольцо хватки дракона', 'ring', 'fgsring17', 30, 3060, 0, 6, 17],'ring19':['Кольцо бесстрашия', 'ring', 'rarring19', 65, 11900, 183.08, 7, 19],'mring19':['Кольцо непрестанности', 'ring', 'meqmring19', 65, 11990, 184.46, 7, 19],'flowers1':['Букет Восторг', 'gift', 'gifts/flowers1', 10, 350, 35.00, 1, 3],'flowers2':['Букет Женское счастье', 'gift', 'gifts/flowers2', 10, 350, 35.00, 1, 3],'venok':['Девичий венок', 'gift', 'gifts/venok', 10, 350, 35.00, 2, 3],'defender_dagger':['Кинжал защитника', 'gift', 'gifts/defender_dagger', 15, 1400, 93.33, 2, 3],'flower_heart':['Сердце из роз', 'gift', 'gifts/flower_heart', 20, 1750, 87.50, 3, 3],'flowers3':['Букет Аромат весны', 'gift', 'gifts/flowers3', 15, 3500, 233.33, 4, 3],'half_heart_m':['Вторая половинка (M)', 'gift', 'gifts/half_heart_m', 25, 5250, 210.00, 2, 3],'half_heart_w':['Вторая половинка (Ж)', 'gift', 'gifts/half_heart_w', 25, 5250, 210.00, 2, 3],'bril_pendant':['Бриллиантовый кулон', 'gift', 'gifts/bril_pendant', 50, 24500, 490.00, 6, 3],'bril_ring':['Кольцо с бриллиантом', 'gift', 'gifts/bril_ring', 40, 35000, 875.00, 5, 4],'d_spray':['Аромат страсти', 'gift', 'gifts/d_spray', 15, 3500, 233.33, 5, 5],'flowers4':['Букет Для любимой', 'gift', 'gifts/buk2', 25, 5250, 210.00, 5, 5],'flowers5':['Букет Роскошный', 'gift', 'gifts/buk1', 25, 5250, 210.00, 5, 5],'protazan':['Серебряный протазан', 'gift', 'gifts/protazan', 40, 8750, 218.75, 2, 5],'wboots':['Сапожки искусительницы', 'gift', 'gifts/wboots', 50, 17500, 350.00, 6, 5],'roses':['Букет Очарование', 'gift', 'gifts/roses', 40, 8750, 218.75, 9, 7],'goldciras':['Кираса защитника', 'gift', 'gifts/goldciras', 50, 14000, 280.00, 4, 7],'warmor':['Броня изящества', 'gift', 'gifts/warmor', 50, 17500, 350.00, 6, 7],'whelmet':['Шляпка соблазна', 'gift', 'gifts/whelmet', 50, 17500, 350.00, 6, 9],'shpaga':['Шпага защитника', 'gift', 'shpaga', 60, 28000, 466.67, 10, 9],'bfly':['Бабочка богини', 'gift', 'gifts/bfly', 50, 52500, 1050.00, 5, 9],'koltsou':['Кольцо предводителя', 'gift', 'koltsou', 40, 24500, 612.50, 6, 10]};
}

function $(id) { return document.querySelector("#"+id); }

function addEvent(elem, evType, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(evType, fn, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent("on" + evType, fn);
	}
	else {
		elem["on" + evType] = fn;
	}
}

function update_n(a,b,c,d,e){if(e){e++}else{e=1;d=(Number(GM_getValue(b+'_update_script_last2','0'))||0)}if(e>3){return}var f=new Date().getTime();var g=document.querySelector('#update_demin_script2');if(g){if((d+86400000<f)||(d>f)){g=g.innerHTML;if(/100000=1.1/.exec(g)){var h=new RegExp(b+'=(\\d+\\.\\d+)=(\\d+)').exec(g);var i=/url7=([^%]+)/.exec(g);if(a&&h&&i){if(Number(h[1])>Number(a))setTimeout(function(){if(confirm('\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u0430: "'+c+'".\n\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0441\u0435\u0439\u0447\u0430\u0441?\n\nThere is an update available for the script: "'+c+'".\nWould you like install the script now?')){if(typeof GM_openInTab=='function'){GM_openInTab(i[1].replace(/\s/g,'')+h[2])}else{window.open(i[1].replace(/\s/g,'')+h[2],'_blank')}}},500)}GM_setValue(b+'_update_script_last2',''+f)}else{setTimeout(function(){update_n(a,b,c,d,e)},1000)}}}else{var j=document.querySelector('body');if(j){var k=GM_getValue(b+'_update_script_array2');if(e==1&&((d+86400000<f)||(d>f)||!k)){if(k){GM_deleteValue(b+'_update_script_array2')}setTimeout(function(){update_n(a,b,c,d,e)},1000);return}var l=document.createElement('div');l.id='update_demin_script2';l.setAttribute('style','position: absolute; width: 0px; height: 0px; top: 0px; left: 0px; display: none;');l.innerHTML='';j.appendChild(l);if((d+86400000<f)||(d>f)||!k){var m=new XMLHttpRequest();m.open('GET','photo_pl_photos.php?aid=1777'+'&rand='+(Math.random()*100),true);m.onreadystatechange=function(){update(m,a,b,c,d,e)};m.send(null)}else{document.querySelector('#update_demin_script2').innerHTML=k;setTimeout(function(){update_n(a,b,c,d,e)},10)}}}}function update(a,b,c,d,e,f){if(a.readyState==4&&a.status==200){a=a.responseText;var g=/(\d+=\d+\.\d+(=\d+)*)/g;var h='';var i=/(url7=[^%]+\%)/.exec(a);if(i){h+=i[1]}while((i=g.exec(a))!=null){if(h.indexOf(i[1])==-1){h+=' '+i[1]}};GM_setValue(c+'_update_script_array2',''+h);var j=document.querySelector('#update_demin_script2');if(j){j.innerHTML=h;setTimeout(function(){update_n(b,c,d,e,f)},10)}}}

})();
