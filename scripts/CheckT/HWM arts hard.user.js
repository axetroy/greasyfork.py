// ==UserScript==
// @name          HWM arts hard
// @namespace     HWM_arts_hard
// @author        перф (+ElMarado +Чеширский КотЪ +CheckT)
// @description   Текущая прочность
// @version       1.53.0
// @homepage      https://greasyfork.org/ru/scripts/375204-hwm-arts-hard
// @encoding      utf-8
// @include       https://www.heroeswm.ru/home.php*
// @include       https://www.heroeswm.ru/pl_info.php?*
// @include       https://www.heroeswm.ru/inventory.php*
// @include       https://www.heroeswm.ru/sklad_info.php?*
// @include       https://www.heroeswm.ru/arts_arenda.php*
// @include       https://www.lordswm.com/home.php*
// @include       https://www.lordswm.com/pl_info.php?*
// @include       https://www.lordswm.com/inventory.php*
// @include       https://www.lordswm.com/sklad_info.php?*
// @include       https://www.lordswm.com/arts_arenda.php*
// @include       http://178.248.235.15/home.php*
// @include       http://178.248.235.15/pl_info.php?*
// @include       http://178.248.235.15/inventory.php*
// @include       http://178.248.235.15/sklad_info.php?*
// @include       http://178.248.235.15/arts_arenda.php*
// @grant         GM_addStyle
// ==/UserScript==

// fix by CheckT
// fix by Чеширский КотЪ https://greasyfork.org/ru/scripts/375197-hwm-arts-hard
try{
(function(){

var show_art_id = false;  //показывать ID артефакта
var show_hard_one = false; //показывать прочку для артов /1

/** === Style ===*/
GM_addStyle ( `
.text_new_begin, .text_new_begin5{
    border: none; /* нет обводки */
    font-size: 9px;
    margin: 1px 0 0 2px; /* верх право низ лево */
    padding: 0 2px 0 0;
    position: absolute;
    z-index: 2; /* перетаскиваем на 2 слоя вверх */
    text-align: center;
    cursor: pointer;
}
.text_new_begin{
    background-color: #E0C898; /* E0C898 - бежевый; #FFF - белый */
    color: #000000;
}
/* старый стиль */
.text_new_begin5{
    background-color: #FFF; /* E0C898 - бежевый; #FFF - белый */
    color: FF0000;
}

/* новый стиль - от Чеширский КотЪ */
/* меняем местами цвета */
/* .text_new_begin5{
    background-color: #FF0000;
    color: #FFF;
    text-shadow: -1px 0 1px white, 1px 1px 3px black; /* тень текста */
    opacity: .6;
}
*/
*/
 /* находим местоположение картинки */
#slot1 > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > img:nth-child(2){
    display: block; /* теперь это прямоугольник (объект с определенными свойствами */
    position: absolute;
    z-index: 1; /* перетаскиваем на 1 слой вверх, под цифры*/
}
` );

/* Style End */
var url = location.href ;
var min_Strength = 2; //прочка начиная с которой подкрашиваем в красный цвет.
var item_hard_regexp = /: (\d+)\/(\d+)/;
var item_name_regexp = /uid=(\d+)/
var text_new_begin =  '<div class="text_new_begin opacity">';
var text_new_begin5 = '<div class="text_new_begin5">';
var text_new_end = '</div>';

if (url.indexOf('pl_info.php') >= 0)
  HardBySlot();

if(url.indexOf('home.php') >= 0){
  addEvent(getClickDiv(), "click", HardBySlot); //для главной страницы
  HardByInfo();
}

if(url.indexOf('arts_arenda.php') >= 0)
  HardByInfo();

if(url.indexOf('sklad_info.php') >= 0)
  HardByInfo();

if(url.indexOf('inventory.php') >= 0) {
    HardBySlot();
    HardByInfo();
  if((typeof arts_c) != 'undefined') {
    // FF4+, Opera
    HardByJS();
  } else {
    // FF3-, Chrome
    // HardByDocument();
    document.body.setAttribute('onload',
        ' function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}; '+
        ' var text_new_begin = \'<div class="text_new_begin>\';'+
        ' var text_new_end = \'</div>\'; '+
        ' var item_hard_regexp = /: (\\d+)\\/(\\d+)/; '+
        ' var dreses = getI( "//div[contains(@id, \'slot\')]" ); '+
        ' for( var i = 0; i < dreses.snapshotLength; i++ ) { '+
        '   var dress = dreses.snapshotItem(i); '+
        '   var hard = item_hard_regexp.exec(dress.innerHTML); '+
        (show_hard_one
          ? 'if(hard)'
          : 'if(hard && hard[2]!="1")'
        )+
        '     dress.innerHTML = text_new_begin + String(hard[1]+'/'+hard[2]) + text_new_end + dress.innerHTML; '+
        ' } '+
        ' for(var i = 0; i < arts_c; i++) { '+
        '   if(arts_fd_none[i]) { '+
        (show_art_id ?
        '                       if(arts_id[i]) {arts1[i]= \'<i style="font-size:10px">&nbsp;&nbsp;ID:\'+  arts_id[i] + \'</i>\' + arts1[i]};'
        : '') +
        '     hard = item_hard_regexp.exec(arts_fd_none[i]); '+
        (show_hard_one
          ? 'if(hard){'
          : 'if(hard && hard[2]!="1"){'
        )+
        '       if(arts_fud[i]) { '+
        '         arts_fud[i]     = text_new_begin + String(hard[1])+\'/\'+ String(hard[2]) + text_new_end + arts_fud[i]; '+
        '       } '+
        '       if(arts_fd_ok[i]) { '+
        '         arts_fd_ok[i]   = text_new_begin + String(hard[1])+\'/\'+ String(hard[2]) + text_new_end + arts_fd_ok[i]; '+
        '       } '+
        '       if(arts_fd_none[i]) { '+
        '         arts_fd_none[i] = text_new_begin + String(hard[1])+\'/\'+ String(hard[2]) + text_new_end + arts_fd_none[i]; '+
        '       } '+
        '     } '+
        '   } '+
        ' } '+
        ' show_c(); '+
        ' ');
  }
}

function addHard(elem, hard){
  var hardHTMLadd = hardHTML(hard);
  if(elem.innerHTML.indexOf(hardHTMLadd) == -1)
      elem.innerHTML = hardHTMLadd + elem.innerHTML;
}

function HardBySlot() {
  var dreses = getI( "//div[contains(@id, 'slot')]" );
  for( var i = 0; i < dreses.snapshotLength; i++ ) {
    var dress =  dreses.snapshotItem(i);
    hard = item_hard_regexp.exec(dress.innerHTML);
    if(hard && (show_hard_one ||hard[2]!='1') )
      addHard(dress, hard);
  }
}

function HardByInfo() {
  var dreses = getI( "//a[contains(@href, 'art_info.php?id=')]" );
  var elo = '' ;
  for( var i = 0; i < dreses.snapshotLength; i++ ) {
    var dress =  dreses.snapshotItem(i);

    var an = item_name_regexp.exec( dress.href ) ;
    if( an ){
      if( elo == an[1] )
        continue;
      else
        elo = an[1];
    }
    hard = item_hard_regexp.exec(dress.parentNode.innerHTML);
    if(hard && (show_hard_one ||hard[2]!='1') )
      addHard(dress.parentNode, hard);
  }
}

function HardByJS() {
  for(var i = 0; i < arts_c; i++) {
    if(arts_fd_none[i]) {
      if(arts_id[i] && show_art_id) {
        arts1[i]= '<i style="font-size:10px">&nbsp;&nbsp;ID:'+  arts_id[i] + '</i>' + arts1[i];
      }
      hard = item_hard_regexp.exec(arts_fd_none[i]);
      if(hard && (show_hard_one ||hard[2]!='1') ){
        if(arts_fud[i]) {
          arts_fud[i] = hardHTML(hard) + arts_fud[i];
        }
        if(arts_fd_ok[i]) {
          arts_fd_ok[i] = hardHTML(hard) + arts_fd_ok[i];
        }
        if(arts_fd_none[i]) {
          arts_fd_none[i] = hardHTML(hard) + arts_fd_none[i];
        }
      }
    }
  }
  show_c();
}

function HardByDocument() {
  var text = String(document.documentElement.innerHTML);
  //alert(text);
  var pos = 0;
  var pos_id = 0;
  var pos_begin = 0;
  var pos_end = 0;
  while(true) {
    pos_id = text.indexOf('/i/artifacts/', pos);
    if(pos_id < 0)
      break;
    if(text.charAt(pos_id - 1) == 'c') {
      pos_begin = text.lastIndexOf('<img', pos_id );
      pos_end = pos_id;
    }
    else {
      pos_begin = text.lastIndexOf('<table', pos_id );
      pos_end = text.indexOf('</a>', pos_id );
    }
    hard = item_hard_regexp.exec(text.substring(pos_begin, pos_end));
    if(hard && (show_hard_one ||hard[2]!='1') ){
      text = text.substring(0, pos_begin) + hardHTML(hard) + text.substring(pos_begin);
    }
    pos = pos_end + text_new_begin.length + text_new_end.length + 5;
  }
  document.documentElement.innerHTML = text;
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

function hardHTML(hard1){
  if ( hard1[1] > min_Strength){
    return text_new_begin  + String(hard1[1]) + '/' + String(hard1[2]) + text_new_end;
  } else {
    return text_new_begin5 + String(hard1[1]) + '/' + String(hard1[2]) + text_new_end;
  }
}

  function getClickDiv(){
    var click_div = document.querySelector("#click_div_arts_hard");
    if(!click_div) {
      click_div = document.createElement('div');
      click_div.id = "click_div_arts_hard";
      click_div.style.display = "none";
      document.querySelector("body").appendChild(click_div);
    }
    return click_div;
  }

  function addEvent(elem, evType, fn) {
    if(elem && fn){
      if (elem.addEventListener)
        elem.addEventListener(evType, fn, false);
      else if (elem.attachEvent)
        elem.attachEvent("on" + evType, fn);
      else
        elem["on" + evType] = fn;
    }
  }

})();
}catch(e){console.log(e);alert(e);}
