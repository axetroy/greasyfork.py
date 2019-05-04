// ==UserScript==
// @name        Wartank special assignment
// @namespace   wartank
// @description Проводит спецзадание
// @include     http://*wartank*.*/company/assault*
// @version     1.07
// @grant       none
// ==/UserScript==
var e = document.createElement('script');
e.src = 'http://code.jquery.com/jquery-2.1.0.min.js';
e.type = 'text/javascript';
document.getElementsByTagName('head') [0].appendChild(e);
e = document.createElement('script');
e.src = "https://greasyfork.org/scripts/5233-jquery-cookie-plugin/code/jQuery_Cookie_Plugin.js";
e.type = 'text/javascript';
document.getElementsByTagName('head') [0].appendChild(e);
var assault = function ()
{
  function work() {
    $('a.simple-but').each(function () {
      var to = this;
      var txt = this.innerHTML;
      if (txt.indexOf('Обновить') + 1) setTimeout(function () {
        to.click();
      }, 3000);
       else
      // Нанесем урон
      if (txt.indexOf('ОБЫЧНЫЕ') + 1) {
        if ($.cookie('assaultBattleUdar')) {
          $.removeCookie('assaultBattleUdar');
          to.click();
        }
        setTimeout(function () {
          to.click();
        }, 5000);
      }
    });
    $('a.simple-but.blue').each(function () {
      var hp = 300;
      $('html > body > div.p5 > div.trnt-block.mb10 > div.wrap1 > div.wrap2 > div.wrap3 > div.wrap4 > div.wrap5 > div.wrap6 > div.wrap7 > div.wrap8 > div.p5.cntr > table.rblock.esmall > tbody > tr > td > div.value-block.lh1 > span > span').each(function() {
        hp = parseInt($(this).html());
      });
      if ($(this).html().indexOf('>Ремкомплект<') + 1 && hp < parseInt($.cookie('assaultBattleRem'))) {
        var rem = true;
        $('div.wrap-content.small.white').each(function () {
          if ($(this).html().indexOf('У вас нет ремкомплекта') + 1) rem = false;
        });
        if (rem) this.click();
      }
    });
  }
  if ($.cookie('assaultBattle')) work();
  var strRem = 0;
  if ($.cookie('assaultBattleRem')) strRem = $.cookie('assaultBattleRem');
  $('html > body > div.p5 > div.medium.white.bold.cntr.mb2').each(function () {
    if ($.cookie('assaultBattleRem')) strRem = $.cookie('assaultBattleRem');
    if ($(this).html().indexOf('Спецзадание') + 1) {
      $(this).prepend('<div>'
      + '<div id="assault">'
      + '<div id="onScript" class="simple-but gray mb2" style="cursor: pointer; width:49.8%; float:left"><span><span><b>Остановить скрипт</b></span></span></div>'
      + '<div id="offScript" class="simple-but gray mb2" style="cursor: pointer; width:49.8%; float:left"><span><span><b>Запустить скрипт</b></span></span></div>'
      + '<div id="assaultRem" class="simple-but gray mb2" style="cursor: pointer; width:49.8%; float:right"><span><span id="assaultNumBotton">Ремкомплект: ' + strRem + '</span></span></div>'
      + '</div>'
      + '<div id="assault_1">'
      + '<table><tr>'
      + '<td style="width:60%;"><input id="assaultImput" style="cursor: pointer; width:97%; text-align:right" type="text" value="' + strRem + '"/></td>'
      + '<td style="width:40%;"><div id="assaultRemVal" class="simple-but gray mb2" style="cursor: pointer"><span><span>Применить</span></span></div></td>'
      + '</tr></table>'
      + '</div>'
      + '</div>'
      );
    }
  });
  if ($.cookie('assaultBattle'))
  $('#offScript').css({
    'display': 'none'
  });
   else
  $('#onScript').css({
    'display': 'none'
  });
  $('#assault_1').css({
    'display': 'none'
  });
  $('#offScript').click(function () {
    $('#onScript').css({
      'display': 'block'
    });
    $('#offScript').css({
      'display': 'none'
    });
    $.cookie('assaultBattle', 'true');
    $.cookie('assaultBattleUdar', 'true');
    work();
  });
  $('#onScript').click(function () {
    $('#onScript').css({
      'display': 'none'
    });
    $('#offScript').css({
      'display': 'block'
    });
    $.removeCookie('assaultBattle');
    $.removeCookie('assaultBattleUdar');
  });
  $('#assaultRem').click(function () {
    $('#assault').css({
      'display': 'none'
    });
    $('#assault_1').css({
      'display': 'block'
    });
  });
  $('#assaultRemVal').click(function () {
    $('#assault').css({
      'display': 'block'
    });
    $('#assault_1').css({
      'display': 'none'
    });
    var num = 0;
    $('#assaultImput').each(function () {
      num = parseInt(this.value);
    });
    $.cookie('assaultBattleRem', num, {
      expires: 30
    });
    $('#assaultNumBotton').each(function () {
      $(this).html( $(this).html().replace( $(this).html(), 'Ремкомплект: ' + num ) );
    });
  });
  $('#assaultImput').bind('change keyup input click', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
}
var err = function ()
{
  $('body').each(function (a) {
    var txt = this.innerHTML;
    if (txt.indexOf('504 Gateway Time-out') + 1) location.reload();
  });
}
window.onload = function ()
{
  var script = document.createElement('script');
  script.textContent = '$(' + err.toString() + ');';
  document.documentElement.appendChild(script);
  script = document.createElement('script');
  script.textContent = '$(' + assault.toString() + ');';
  document.documentElement.appendChild(script);
}