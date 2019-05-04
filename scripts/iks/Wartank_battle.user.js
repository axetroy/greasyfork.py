// ==UserScript==
// @name        Wartank_battle
// @namespace   wartank
// @description Регистрируется и проводит войны, сражения, встречки
// @include     http://*wartank*.*/pve*
// @include     http://*wartank*.*/dm*
// @include     http://*wartank*.*/cw*
// @version     1.01
// @grant       none
// ==/UserScript==

var e = document.createElement("script");
e.src = "http://code.jquery.com/jquery-2.1.0.min.js";
e.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(e);
e = document.createElement("script");
e.src = "https://greasyfork.org/scripts/5233-jquery-cookie-plugin/code/jQuery_Cookie_Plugin.js";
e.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(e);
var vojna = function()
{
	function work ()
	{
		var timeOutId = 0;
		$('a.simple-but.border.mb5').each(function() {
			if(	$.cookie('battleTank') ) {
				if(	$(this).html().indexOf('Другим танком') + 1 ) {
					$.removeCookie('battleTank');
					this.click();
				}
		}
		});
		$('div.small.bold.cntr.gray1.sh_b.mt2 > div.white').each(function() {
			if(	$(this).html().indexOf('Мои достижения') + 1 ||
				 $(this).html().indexOf('Моя награда') + 1)
			{
				$.removeCookie('battle');
				$.removeCookie('battleTank');
			}
		});
		$('a.simple-but').each(function() {
			var to = this;
			var txt = $(this).html(), str;
      
			if ( $.cookie('battle') )
			{
				if(	txt.indexOf('Подать заявку') + 1 ||
						txt.indexOf('Взвод, подъем! В атаку') + 1 ||
						txt.indexOf('Каждый сам за себя') + 1) to.click();
				else
				if(txt.indexOf('Обновить') + 1) timeOutId = setTimeout( function(){ to.click(); }, 3500 );
			}
			if(txt.indexOf('ОБЫЧНЫЕ') + 1) {
				if( $.cookie('battleUdar') ) {
					$.removeCookie('battleUdar');
					to.click();
				}
				timeOutId = setTimeout( function(){ to.click(); }, 5000 );
			}
		});
	}
	$('a.simple-but.blue').each(function() {
		var to = this;
		var txt = $(this).html();
		var hp = 0;
		$('html > body > div.p5 > table > tbody > tr > td.w50.pr1 > div.trnt-block.mb10 > div.wrap1 > div.wrap2 > div.wrap3 > div.wrap4 > div.wrap5 > div.wrap6 > div.wrap7 > div.wrap8 > div.p5.cntr > table.rblock.esmall > tbody > tr > td > div.value-block.lh1 > span > span').each(function() {
			hp = parseInt( $(this).html() );
		});
		function workRem(to) {
			$('div.wrap-content.small.white').each(function(){
				if($(this).html().indexOf('У вас нет ремкомплекта') + 1) return;
				else
					to.click();
			});
		}
		if(hp < parseInt( $.cookie('vojnaBattleRem') )+1 && txt.indexOf('>Ремкомплект<') + 1) workRem(to);
		if(txt.indexOf('>Маневр<') + 1) to.click();
	});
	function battleProv ()
	{
		var prov = false;
		var h = new Date();
		var min = h.getMinutes();
		var arr = [
								['cw', 60, [10, 16, 22] ],
								['pve',60, [7, 9, 11, 13, 15, 17, 19, 21] ],
								['dm', 30, [12, 16, 22] ]
							];
		if( $.cookie('battle') == 'null' || !$.cookie('battle') ) {
			for(var i = 0; i < arr.length; i++) {
				for(var j = 0; j < arr[i][2].length; j++) {
					if ( arr[i][2][j] == h.getHours() && arr[i][1]-4 < min && arr[i][1] > min )
					{
						prov = true;
						$.cookie('battle', 'true');
						$.cookie('battleUdar', 'true');
						$.cookie('battleTank', 'true');
						document.location.href = 'http://wartank.ru/' + arr[i][0];
						break;
					} // end if
				} // end  for
				if (prov) break;
			} // end for
		} // end if
    
	} // end battleProv
	var timerId = 0;
	function workProv (){
		if( $.cookie('vojnaBattleScript') ) {
			timerId = setInterval(function() {
				battleProv();
			}, 1000*60);
			battleProv();
			work();
		}
	} // end workProv
	workProv();
	var strRem = 0;
	if($.cookie('vojnaBattleRem')) strRem = $.cookie('vojnaBattleRem');
	$('div.p5 > div.round-panel').after(
		'<div style="margin:3px 0 3px;display:table;width:100%">'
			+'<div id="vojna">'
				+'<div id="onScript" class="simple-but gray mb2" style="cursor: pointer; width:49.5%; float:left"><span><span><b>Остановить скрипт</b></span></span></div>'
				+'<div id="offScript" class="simple-but gray mb2" style="cursor: pointer; width:49.5%; float:left"><span><span><b>Запустить скрипт</b></span></span></div>'
				+'<div id="vojnaRem" class="simple-but gray mb2" style="cursor: pointer; width:49.5%; float:right"><span><span id="vojnaNumBotton">Ремкомплект: ' + strRem + '</span></span></div>'
			+'</div>'
			+'<div id="vojna_1">'
				+'<table><tr>'
					+'<td style="width:60%;"><input id="vojnaImput" style="cursor: pointer; width:97%; text-align:right" type="text" value="' + strRem + '"/></td>'
					+'<td style="width:40%;"><div id="vojnaRemVal" class="simple-but gray mb2" style="cursor: pointer"><span><span>Применить</span></span></div></td>'
				+'</tr></table>'
			+'</div>'
		+'</div>'
	);
	if($.cookie('vojnaBattleScript'))
		$('#offScript').css({'display':'none'});
	else
		$('#onScript').css({'display':'none'});
	$('#vojna_1').css({'display':'none'});
	$('#offScript').click(function(){
		$('#onScript').css({'display':'block'});
		$('#offScript').css({'display':'none'});
		$.cookie('vojnaBattleScript', 'true', {expires: 30});
		$.cookie('battleUdar', 'true');
		workProv();
	});
	$('#onScript').click(function(){
		$('#onScript').css({'display':'none'});
		$('#offScript').css({'display':'block'});
		clearInterval(timerId);
		$.removeCookie('vojnaBattleScript');
		$.removeCookie('battleUdar');
  });
  $('#vojnaRem').click(function(){
    $('#vojna').css({'display':'none'});
    $('#vojna_1').css({'display':'block'});
  });
  $('#vojnaRemVal').click(function(){
    $('#vojna').css({'display':'block'});
    $('#vojna_1').css({'display':'none'});
    var num = 0;
    $('#vojnaImput').each(function(){
      num = parseInt( this.value );
    });
    $.cookie('vojnaBattleRem', num, {expires: 30});
    $('#vojnaNumBotton').each(function(){
      $(this).html($(this).html().replace($(this).html(), 'Ремкомплект: '+num));
    });
  });
  $('#vojnaImput').bind("change keyup input click", function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
} // end vojna
var err = function()
{
	// ошибка 504 обновим
	$('body').each(function(a) {
		var txt = $(this).html();
		if(	txt.indexOf('504 Gateway Time-out') + 1 ||
			txt.indexOf('502 Bad Gateway') + 1 ||
			txt.indexOf('Ошибка на сервере') + 1 ||
			txt.indexOf('Попытка соединения не удалась') + 1 ||
			txt.indexOf('Соединение закрыто удалённым сервером') + 1 ||
			txt.indexOf('Не удалось подключиться к удалённому серверу') + 1 ||
			txt.indexOf('Проблема сети') + 1 )  setTimeout( function(){ location.reload(); }, 5000 );
	});
	var urlGame = window.location.href;
	if( urlGame.indexOf('/cw') + 1 ) {
		$('a.simple-but').each(function(){
			if( $(this).html().indexOf('Получить снабжение') + 1 ) this.click();
		});
	}
	setTimeout( function(){ document.location.href = "http://wartank.ru/cw"; }, 1000*60*15 );
} // end err

window.onload = function()
{
	var script = document.createElement("script");
	script.textContent = '\n$(' + err.toString() + ');\n';
	document.documentElement.appendChild(script);

	script = document.createElement("script");
	script.textContent = '\n$(' + vojna.toString() + ');\n';
	document.documentElement.appendChild(script);
}