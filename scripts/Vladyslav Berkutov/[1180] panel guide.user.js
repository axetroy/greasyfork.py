// ==UserScript==
// @name           [1180] panel guide 
// @namespace      berkut009
// @description    panel guide
// @version        1.5
// @include        http://www.heroeswm.ru/*
// @include        http://www.heroeswm.com/battlechat.php*
// @include        http://rus.heroeswm.com/battlechat.php*
// @include        http://www.lordswm.com/*
// @exclude        */ch_box.php*
// @exclude        */chatonline.php*
// @exclude        */chat_line.php*
// @exclude        */chatpost.php*
// @exclude        */chat.php*
// @exclude        */ticker.html*
// @exclude        */war.php*
// @exclude        */cgame.php*
// ==/UserScript==


var serv = 'ru';
if (location.href.match(/heroeswm.ru/)) {
    serv = 'ru';
} else if (location.href.match(/lordswm.com/)) {
    serv = 'com';
} else if (location.href.match(/rus.heroeswm.com/)) {
    serv = 'ru';
} else if (location.href.match(/heroeswm.com/)) {
    serv = 'com';
}

var  text_nummove, text_player, text_message;

if (serv == 'com') {
	text_nummove = 'Num~Move:';
	text_player = 'Player';
	text_message = 'Message';
} else {
	text_nummove = '<a  style="text-decoration: none;" href="clan_info.php?id=1180">Паутина</a>';
	text_player = '<a  style="text-decoration: none;" href="sklad_info.php?id=12">Склад</a>';
	text_message = '<a  style="text-decoration: none;" href="clan_control.php?id=1180">Управление</a>';
	text_forum = '<a style="text-decoration: none;" href="forum_messages.php?tid=926425&page=last">Форум</a>';
	text_6 = '<a style="text-decoration: none;" href="clan_members.php?id=1180">Состав</a>';
	text_7 = '<a style="text-decoration: none;" href="clan_invites.php?id=1180">Приглашения</a>';
	text_8 = '<a style="text-decoration: none;" href="clan_balance.php?id=1180">Счет</a>';
	text_9 = '<a style="text-decoration: none;" href="clan_broadcast.php?id=1180">Рассылка</a>';
	text_10 = '<a style="text-decoration: none;" href="clan_glory.php?id=1180">Боевая слава</a>';
    text_11 = '<a style="text-decoration: none;" href="clan_bplan.php?id=1180">Воен. пол.</a>';

	}

var stable = {};
var setted = false;
var second = false;

// adds new chat-string to the table
function addstr(table, str)
{
	if (m = str.match(/(\d+~\d+:)(\*?)\[([^\]]*)\]:([^<]*)<?/)) {
		var newtr = document.createElement('tr');
		if (second) newtr.setAttribute('class', 'second');
		second = !second;

		var newtd = document.createElement('td');
		//newtd.appendChild(document.createTextNode(m[1]+'\xA0\xA0\xA0\xA0\xA0'));
		newtd.appendChild(document.createTextNode(m[1]));
		newtr.appendChild(newtd);

		var newtd = document.createElement('td');
		var newa = document.createElement('a');
	
		var newtd = document.createElement('td');
		var newspan = document.createElement('span');
		

		newtr.setAttribute('desc', m[3]);
		newtr.addEventListener('click', function(e) {
			if (e.target.tagName != 'A') {
				var caller = e.target;
				for (var xcp=0; xcp<5; xcp++) {
					
				}
				
				e.preventDefault();

			
				setted = caller.getAttribute('desc');
				var arr = stable[caller.getAttribute('desc')];
				for(var i=0; i<arr.length; i++) {
					//arr[i].getElementsByTagName('span')[0].style.fontWeight = 'bold';
					arr[i].style.backgroundColor='#cccccc';
				}
				//newspan.style.fontWeight='bold';
			}
		}, false);

		table.appendChild(newtr);
		
	} else {
		// string doesnt match?
		// alert(str);
	}
}

var m;
if (!(m = location.href.match())) {
	return;
}
var warid = m[1180];

document.body.setAttribute('bgcolor', '#ddd9cd');
var link1 = document.createElement('link');
link1.href = "style3.css";
link1.type = "text/css";
link1.rel = "stylesheet";
document.getElementsByTagName('head')[0].appendChild(link1);
var link2 = document.createElement('link');
link2.href = "globalddm2.css";
link2.type = "text/css";
link2.rel = "stylesheet";
document.getElementsByTagName('head')[0].appendChild(link2);

var node = document.body.childNodes[0];

var nfont = document.createElement('font');

nfont.setAttribute('class', 'forumt');
nfont.style.textDecoration = 'none';
document.body.insertBefore(nfont, node);

var newtable = document.createElement('table');
newtable.width = '100%';
newtable.setAttribute('class', 'table3 forum c_darker');
newtable.setAttribute('cellpadding', 0);
newtable.setAttribute('cellspacing', 0);
document.body.insertBefore(newtable, node);

var trh = document.createElement('tr');
var th1 = document.createElement('td');
var th2 = document.createElement('th');
var th3 = document.createElement('th');
var th4 = document.createElement('th');
var th5 = document.createElement('th');
var th6 = document.createElement('th');
var th7 = document.createElement('th');
var th8 = document.createElement('th');
var th9 = document.createElement('th');
var th10 = document.createElement('th');
var th11 = document.createElement('th');
trh.appendChild(th1);
trh.appendChild(th2);
trh.appendChild(th4);
trh.appendChild(th3);
trh.appendChild(th6);
trh.appendChild(th7);
trh.appendChild(th8);
trh.appendChild(th9);
trh.appendChild(th10);
trh.appendChild(th11);
th1.innerHTML = text_nummove;
th2.innerHTML = text_player;
th4.innerHTML = text_forum;
th6.innerHTML = text_6;
th7.innerHTML = text_7;
th8.innerHTML = text_8;
th9.innerHTML = text_9;
th10.innerHTML = text_10;
th11.innerHTML = text_11;
th1.width = '15px';
th2.width = '15px';
th4.width = '25px';
th5.width = '450px';
th6.width = '35px';
th7.width = '35px';
th8.width = '35px';
th9.width = '35px';
th10.width = '100px';
th11.width = '125px';
newtable.appendChild(trh);




