// ==UserScript==
// @name        Wartank battle Masters
// @namespace   wartank
// @description Регистрируется и проводит Битвы мастеров
// @include     http://*wartank*.*/pvp*
// @version     1.06
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
var pvp = function()
{
  function work() {
    if($.cookie('pvpBattle')) {
      $('a.simple-but').each(function() {
        var to = this;
        var txt = this.innerHTML;
        if(txt.indexOf('Участвовать') + 1) {
          $.cookie('pvpBattleUdar', 'true');
          to.click();
          return;
        }
        else
          if(txt.indexOf('Обновить') + 1) setTimeout( function(){ to.click(); }, 3000 );
        else // Нанесем урон
          if(txt.indexOf('ОБЫЧНЫЕ') + 1) {
            if($.cookie('pvpBattleUdar')) {
              $.removeCookie('pvpBattleUdar');
              to.click();
              return;
            }
            setTimeout( function(){ to.click(); }, 5000 );
          }
      });
      $('a.simple-but.blue').each(function() {
        var to = this;
        var txt = this.innerHTML;
        var hp = 0;
        $('html > body > div.p5 > table > tbody > tr > td.w50.pr1 > div.trnt-block.mb10 > div.wrap1 > div.wrap2 > div.wrap3 > div.wrap4 > div.wrap5 > div.wrap6 > div.wrap7 > div.wrap8 > div.p5.cntr > table.rblock.esmall > tbody > tr > td > div.value-block.lh1 > span > span').each(function() {
          hp = parseInt( this.innerHTML );
        });
        var hpMin = 0;
        if($.cookie('pvpBattleRem')) hpMin = parseInt($.cookie('pvpBattleRem'))+1;
        if(txt.indexOf('>Ремкомплект<') + 1 && hp < hpMin) {
          var rem = true;
          $('div.wrap-content.small.white').each(function(){
            var txt = this.innerHTML;
            if(txt.indexOf('У вас нет ремкомплекта') + 1) rem = false;
          });
          if(rem) to.click();
        }
        if(txt.indexOf('>Маневр<') + 1) to.click();

      });
    
    }
  }
  work();
  $('html > body > div.p5 > div.mt0.mb5.small.gray1.cntr').each(function(){
    var strRem = 0;
    if($.cookie('pvpBattleRem')) strRem = $.cookie('pvpBattleRem');
    var str = this.innerHTML;
    if(str.indexOf('рейтингом') + 1) {
      var txt = '<table><tr><td>'
                 +'<div id="pvp_1">'
                  +'<div id="onScript" class="simple-but" style="cursor: pointer; width:49.8%; float:left"><span><span><b>Остановить скрипт</b></span></span></div>'
                  +'<div id="offScript" class="simple-but" style="cursor: pointer; width:49.8%; float:left"><span><span><b>Запустить скрипт</b></span></span></div>'
                  +'<div id="pvpRem" class="simple-but" style="cursor: pointer; width:49.8%; float:right"><span><span id="pvpNumBotton">Ремкомплект: ' + strRem + '</span></span></div>'
                +'</div>'
                +'<div id="pvp_2">'
                  +'<table><tr>'
                    +'<td style="width:60%;"><input id="pvpImput" style="cursor: pointer; width:97%; text-align:right" type="text" value="' + strRem + '"/></td>'
                    +'<td style="width:40%;"><div id="pvpRemVal" class="simple-but md5" style="cursor: pointer"><span><span>Применить</span></span></div></td>'
                  +'</tr></table>'
                +'</div>'
              +'</td></tr><tr><td>'+str+'</td></tr></table>';
      $(this).html($(this).html().replace(str, txt));
    }
  });
  if($.cookie('pvpBattle'))
    document.getElementById('offScript').style.display = "none";
  else
    document.getElementById('onScript').style.display = "none";
  document.getElementById('pvp_2').style.display = "none";
  $('#offScript').click(function(){
    document.getElementById('onScript').style.display = "block";
    document.getElementById('offScript').style.display = "none";
    $.cookie('pvpBattle', 'true');
    work();
  });
  $('#onScript').click(function(){
    document.getElementById('onScript').style.display = "none";
    document.getElementById('offScript').style.display = "block";
    $.removeCookie('pvpBattle');
  });
  $('#pvpRem').click(function(){
    document.getElementById('pvp_1').style.display = "none";
    document.getElementById('pvp_2').style.display = "block";
  });
  $('#pvpRemVal').click(function(){
    document.getElementById('pvp_1').style.display = "block";
    document.getElementById('pvp_2').style.display = "none";
    var num = 0;
    $('#pvpImput').each(function(){
      num = parseInt( this.value );
    });
    $.cookie('pvpBattleRem', num, {expires: 30});
    $('#pvpNumBotton').each(function(){
      $(this).html($(this).html().replace(this.innerHTML, 'Ремкомплект: '+num));
    });
  });
  $('#pvpImput').bind("change keyup input click", function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
}
var err = function()
{
  $('body').each(function(a) {
    var txt = this.innerHTML;
    if(txt.indexOf('504 Gateway Time-out') + 1) location.reload();
  });
}
window.onload = function()
{
	var script = document.createElement("script");
	script.textContent = '$(' + err.toString() + ');';
	document.documentElement.appendChild(script);
  
	var urlGame = window.location.href;
	script = document.createElement("script");
	script.textContent = '$(' + pvp.toString() + ');';
	document.documentElement.appendChild(script);
}