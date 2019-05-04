// ==UserScript==
// @name             BPDMod - PetriDish.pw Mod!
// @name:ru          BPDMod - Скрипт для ЧашкиПетри!
// @version          3.0
// @description      MACRO|BOTS|GOLDNICK|THEME|ZOOM|SPAM|HELP|AND MORE
// @description:ru   МАКРОСЫ|БОТЫ|ГОЛДНИК|ТЕМА|ЗУМ|СПАМ|ПОМОЩЬ|И ЕЩЁ
// @match            http://petridish.pw/ru/
// @match            http://petridish.pw/en/
// @match            http://petridish.pw/fr/
// @namespace        https://greasyfork.org/users/82280
// ==/UserScript==
var dkey = [81, 88, 113, 115, 120], key = [], key2 = [], c = settedlang;
if (!loaded) {
	switch (settedlang) {
	case 'ru':
		console.log('Загрузка...');
		$('.add').replaceWith('<div class=info-landing style=min-width:300px> <h2>Помощь!</h2> <div></div><div class=set-group> <div class=set> <div class=hot-latter><input maxlength=2 placeholder="Q" class="hb"></div><p>– Макрос на W</div><div class=set> <div class=hot-latter><input maxlength=2 placeholder="X" class="hb"></div><p>– Ультра зум</div><div class=set> <div class=hot-latter><input maxlength=2 placeholder="F2" class="hb"></div><p>– Макрос на кнопку "играть"</div><div class=set> <div class=hot-latter><input maxlength=2 placeholder="F4" class="hb"></div><p>– Перезайти/боты (Shift для спеков)</div><div class=set> <div class=hot-latter><input maxlength=2 placeholder="F9" class="hb"></div><p>– След. сервер</div><div class=set> <h3>Также проверь настройки!</h3> </div></div></div>');
		$('#option-common ul').append('<li><span>Блинк цветами</span> <input id=cblink class=checkbox type=checkbox><label for=cblink></label>  <li><span>Выключить стиль</span> <input id=stule class=checkbox type=checkbox><label for=stule></label> <li><span>Дев-мод</span> <input id=devm class=checkbox type=checkbox><label for=devm></label> <li class=flex><span>Бот-ник</span> <div><input id=bname placeholder="Ник" style="margin-right:10px;padding:0 0;border:1px solid rgba(0,0,0,.1);height:26px;text-align:center;border-radius:15px" maxlength=15> <input id=custbna class=checkbox type=checkbox><label for=custbna></label></div><li> <div class=info-wrapper style=width:inherit><input type="text" id=gnn class=left maxlength=15 placeholder="Добавить голдник" style=width:77%> <div class="blue button color right" id=gnks><span>Go!</span></div></div>');
		break;
	default:
		console.log('Load...');
		$('.add').replaceWith('<div class=info-landing style=min-width:300px><h2>Mod support!</h2><div></div><div class=set-group><div class=set><div class=hot-latter><input maxlength=2 placeholder="Q" class="hb"></div><p>– Feed</div><div class=set><div class=hot-latter><input maxlength=2 placeholder="F2" class="hb"></div><p>– Fast click play</div><div class=set><div class=hot-latter><input maxlength=2 placeholder="F4" class="hb"></div><p>– Reconnect (Shift for spect)</div><div class=set><div class=hot-latter><input maxlength=2 placeholder="F9" class="hb"></div><p>– Next Server</div><div class=set><div class=hot-latter><input maxlength=2 placeholder="X" class="hb"></div><p>– Inf zoom</div><div class=set><h3>Check settings!</h3></div></div></div>');
		$('#option-common ul').append('<li><span>Color Blink</span> <input id=cblink class=checkbox type=checkbox><label for=cblink></label><li><span>Style OFF</span> <input id=stule class=checkbox type=checkbox><label for=stule></label><li><span>Dev-Mode</span> <input id=devm class=checkbox type=checkbox><label for=devm></label><li class=flex><span>Custom botname</span><div><input id=bname style="margin-right:10px;padding:0 0;border:1px solid rgba(0,0,0,.1);height:26px;text-align:center;border-radius:15px"size=15> <input id=custbna class=checkbox type=checkbox><label for=custbna></label></div><li><div class=info-wrapper style=width:inherit><input type="text" id=gnn class=left maxlength=15 placeholder="Add goldnick"style=width:77%><div class="blue button color right"id=gnks><span>Go!</span></div></div>');
	}
	$('body').append("<style>.hb{border:none;font-family:SourceSansSemiBold;font-size:14px;text-transform:uppercase;text-align:center;background:inherit;border-radius:inherit;height:inherit;width:inherit}div.name{margin:3px 3px 3px 0!important;display:inline-block!important;height:25px!important;padding:3px!important}</style>");
	$('body').append('<link id="stylish-1" rel="stylesheet" type="text/css" href="http://ня.su/bw3">');
} else
	rdd.log('Reload...');

var rdd = {
	sw: 10,
	sc: 50,
	sr: 400,
	sty: $('#stylish-1'),
	devm: $('#devm'),
	gnk: ['123461', 'los'],
	log: function (text) {
		console.log("%cBPDMod:", 'background: #F64747; color: #fff; padding: 4px;', text);
	},
	set: function (s, tx) {
		console.log("%c%s ", 'background: #7aa1bd; color: #fff;margin: 0; padding: 3px;', s.toUpperCase(), tx);
	}
},
t = {
	ru: {
		0: "Добро пожаловать!",
		1: "Ник бота",
		2: "Стиль   ",
		3: "Дев-Мод ",
		4: "Голдники",
		5: "Добавлен голдник",
		6: "Удален голдник  ",
		"off": "ВЫКЛ",
		"on": "ВКЛ"
	},
	en: {
		0: "Welcome! ",
		1: "Botname: ",
		2: "Style    ",
		3: "Dev-Mode ",
		4: "Goldnicks",
		5: "Added goldnick  ",
		6: "Removed goldnick",
		"off": "OFF",
		"on": "ON"
	}
}, loaded = true; t.fr = t.nl = t.en;

rdd.log(t[c][0]);

if (readCookie('botname')) {
	$('#bname').val(readCookie('botname'));
	rdd.set(t[c][1], readCookie('botname'));
}
if (readCookie('custbn') == 'true') {
	$('#custbna').attr("checked", "checked");
}
if (readCookie('offstyle')) {
	$("#stule").attr("checked", "checked");
	rdd.sty.detach();
	rdd.set(t[c][2], t[c].off);
} else {
	rdd.set(t[c][2], t[c].on);
}
if (readCookie('dev') == 'true') {
	rdd.dev = true;
	rdd.devm.attr("checked", "checked");
	rdd.set(t[c][3], t[c].on);
}
if (readCookie('goldnk')) {
	rdd.gnk = readCookie('goldnk').split(',');
	rdd.set(t[c][4], readCookie('goldnk'));
	$('div.name').remove();
	for (var i = 0; i < rdd.gnk.length; i++) {
		var nk = rdd.gnk[i];
		$('#option-common ul').append('<div class="button blue big name"><span>' + nk + '</span><i class="mdi mdi-close mdi-18px"></i></div>');
		if (!~supergolden.indexOf(nk)) {
			supergolden.push(nk);
		}
	}
} else {
	createCookie('goldnk', rdd.gnk, 10);
	supergolden = supergolden.concat(rdd.gnk);
}
if (readCookie('hotbtns')) {
	key = readCookie('hotbtns').split(',');
	key2 = readCookie('hotkeys').split(',');
	for (i = 0; i < key2.length; i++) {
		key[i] = Number(key[i]);
		$('.hb:eq(' + i + ')').val(key2[i]);
	}
} else
	key = dkey;

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
function keydown(event) {
	if (!isTyping) {
		if (rdd.dev)
			rdd.log('Click = ' + event.keyCode);
		if (event.keyCode === 16 && !rdd.shift) {
			rdd.shift = true;
		}
		if (event.keyCode == key[0] && !rdd.feed) {
			rdd.feed = true;
			feed();
		}
		if (event.keyCode === key[1] && !isSpectating) {
			rdd.zoom = true;
			setUnlimitedZoom(true);
			setSpectate(true);
		}
		if (event.keyCode === key[2] && !rdd.connect) {
			rdd.connect = true;
			conr();
		}
		if (event.keyCode === key[3] && !rdd.recon) {
			bot();
			rdd.recon = true;
			recon();
		}
		if (event.keyCode === key[4] && !rdd.next && !(!selectedServer)) {
			bot();
			rdd.next = true;
			rdd.servv = $('li[style="display: flex;"]');
			nextserv();
		}
	}
}

function keyup(event) {
	if (!isTyping) {
		if (rdd.dev)
			rdd.log('UP = ' + event.keyCode);
		if (event.keyCode === 16)
			setTimeout(rdd.shift = false, 1000);
		if (event.keyCode == key[0])
			rdd.feed = false;
		if (event.keyCode === key[1] && rdd.zoom) {
			rdd.zoom = false;
			setUnlimitedZoom(false);
			setSpectate(false);
		}
		if (event.keyCode === key[2])
			rdd.connect = false;
		if (event.keyCode === key[3] && rdd.recon) {
			rdd.recon = false;
			setTimeout(insert(rdd.pnk, rdd.pps), rdd.sr);
		}
		if (event.keyCode === key[4] && rdd.next) {
			rdd.next = false;
			setTimeout(insert(rdd.pnk, rdd.pps), rdd.sr);
		}
	}
}

function conr() {
	if (rdd.connect) {
		playbtnclick();
		setTimeout(conr, rdd.sc);
	}
}

function feed() {
	if (rdd.feed && currentmode !== 'SNAKERDISH') {
		$("body").trigger($.Event("keydown", {
				keyCode: 87
			}));
		$("body").trigger($.Event("keyup", {
				keyCode: 87
			}));
		setTimeout(feed, rdd.sw);
	}
}

function recon() {
	if (rdd.recon && !isSpectating) {
		if ($('.server-item.active').next('[style="display: flex;"]').length === 0) {
			
			$('.server-item.active').prev('[style="display: flex;"]').click()
			playbtnclick();
			$('.server-item.active').next('[style="display: flex;"]').click();
			playbtnclick();
		} else {
			$('.server-item.active').next('[style="display: flex;"]').click();
		playbtnclick();
		$('.server-item.active').prev('[style="display: flex;"]').click()
		playbtnclick();
		}
		playbtnclick();
		playbtnclick();
		setTimeout(recon, rdd.sr);
		return;
	}
	$('.my-sticks li.active').click();
}

function nextserv() {
	if (rdd.next) {
		if ($('.server-item.active').next('[style="display: flex;"]').length === 0) {
			$('.server-item[style="display: flex;"]')[0].click();
		} else
			$('.server-item.active').next('[style="display: flex;"]').click();
		playbtnclick();
		setTimeout(nextserv, 600);
	}
}

function bot() {
	rdd.pnk = $('#nick').val();
	rdd.pps = $('#password').val();
	if (readCookie("botname")) {
		var n = (readCookie("custbn") == 'true') ? readCookie("botname") : "ня.su/bqy";
		insert(n, rdd.pps);
	}
}

$('#cblink').click(function () {
	if ($("#cblink").is(':checked')) {
		sendCol();
		interval = setInterval(function () {
				clickColor("#FFFFFF", 0);
				sendCol();
			}, 10000);
	} else {
		clearInterval(interval);
	}
});

rdd.devm.click(function () {
	createCookie('dev', rdd.devm.is(':checked'), 10);
	rdd.dev = rdd.devm.is(':checked');
});

$("#stule").click(function () {
	if ($("#stule").is(':checked')) {
		rdd.sty.detach();
		createCookie('offstyle', true, 10);
	} else {
		rdd.sty.appendTo('body');
		eraseCookie('offstyle');
	}
});

gnks.onclick = function () {
	var nk = gnn.value.toLowerCase();
	if (nk !== '' && supergolden.indexOf(nk) == -1) {
		rdd.gnk.push(nk);
		supergolden.push(nk);
		createCookie('goldnk', rdd.gnk, 10);
		rdd.set(t[c][5], nk);
		fly(nk.toUpperCase());
		gnn.value = '';
		$('#option-common').append('<div class="button blue big name"><span>' + nk + '</span><i class="mdi mdi-close mdi-18px"></i></div>');
	}
};

$("#option-common").on('click', 'div.name', function (event) {
	var trg = event.currentTarget,
	nk = trg.textContent;
	rdd.set(t[c][6], nk);
	rdd.gnk.splice(rdd.gnk.indexOf(nk), 1);
	supergolden.splice(supergolden.indexOf(nk), 1);
	createCookie('goldnk', rdd.gnk, 10);
	trg.parentNode.removeChild(trg);
});

$('.hb').keydown(function (event) {
	var n = $('.hb').index(event.target);
	event.preventDefault();
	if (event.key.length < 4) {
		event.target.value = event.key;
		key[n] = event.keyCode;
		key2[n] = event.key;
	}
	if (event.keyCode == 8) {
		key[n] = dkey[n];
		key2[n] = undefined;
		event.target.value = "";
	}
	createCookie('hotbtns', key, 10);
	createCookie('hotkeys', key2, 10);
});
$('.mode-item').click(function () {
	$('.info-landing:eq(1)').show();
});

$('#custbna').click(function () {
	createCookie('custbn', $('#custbna').is(':checked'), 10);
});
$('#bname').change(function () {
	createCookie('botname', $('#bname').val(), 10);
});

$('#bname,.hb,#gnn').blur(function () {
	isTyping = false;
});
$('#bname,.hb,#gnn').focus(function () {
	isTyping = true;
});

$('#custbna').click(function () {
	createCookie('custbn', $('#custbna').is(':checked'), 10);
});
$('#bname').change(function () {
	createCookie('botname', $('#bname').val(), 10);
});
