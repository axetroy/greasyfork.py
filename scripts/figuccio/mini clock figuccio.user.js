// ==UserScript==
// @name        mini clock figuccio
// @namespace https://greasyfork.org/users/237458
// @description clock con comandi multiposizione e mostra nascondi ora
// @version     0.7
// @include     *
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @icon        data:image/gif;base64,R0lGODlhEAAQAKECABEREe7u7v///////yH5BAEKAAIALAAAAAAQABAAAAIplI+py30Bo5wB2IvzrXDvaoFcCIBeeXaeSY4tibqxSWt2RuWRw/e+UQAAOw==
// ==/UserScript==
"use strict";
var doc = document, isTop = window.self==window.top, isFF = /Firefox/i.test(navigator.userAgent),
  div, spn, wrapper,
  ref = 0, fontSize,
  hTimer = 0, hTimer2 = 0, hTimer3 = 0,
  datePattern = (function(){
    switch(navigator.language.slice(0,2)){
    }
  }());


function getValue(name, dflt) { return (typeof(GM_getValue)=='function') ? GM_getValue(name, dflt) : dflt; }
function setValue(name, value) { if(typeof(GM_setValue)=='function') GM_setValue(name, value); }
function addStyle(style) { var o = obj('+STYLE', doc.getElementsByTagName('HEAD')[0]); o.innerHTML = style; return o; }

function obj(name, parent) {
  if(!parent) parent = doc;
  switch (name.charAt(0)) {
  case '#':
    return parent.getElementById(name.slice(1));
  case '.':
    return parent.getElementsByClassName(name.slice(1))[0];
  case '+':
    var a = name.split(','); name = a.shift();
    var m = name.match(/^\+([A-Za-z]+)\b/), node = doc.createElement(m[1]);
    m = name.match(/\.\w+/); if(m) node.className = m[0].slice(1);
    m = name.match(/#\w+/); if(m) node.id = m[0].slice(1);
    while(a.length) {
      var l = a.shift().split('=');
      if(!l[1]) l.push(l[0]);
      else if(/^".*"$/.test(l[1])) l[1] = l[1].slice(1,-1);
      switch(l[0]){
      case '': node.textContent = l[1]; break;
      case 'HTML': node.innerHTML = l[1]; break;
      default: node.setAttribute(l[0], l[1]);
      }
    };
    if(parent != doc) parent.appendChild(node);
    return node;
  }
  return parent.getElementsByTagName(name)[0];
}

function niceTime(date) { return date.toLocaleTimeString();} //ore minuti e secondi
function niceDate(d) { return d.toLocaleDateString('it');}//mostra data lingua italiana
//function niceDate(date) { return date.toLocaleString(); }//mostra data+ora menu contestuale
//function niceDate(d) { return d.toDateString();}//giorno della settimana e mese non italiano
//function niceTime(date) { return date.toLocaleString();}//ore minuti e secondi+data numerica


if(isTop) {
  if(typeof(GM_registerMenuCommand)=='function') {

    if(!isFF) {
      GM_registerMenuCommand('nascondi mini clock', function(event) { div.style.opacity='0'; }, 'h');
      GM_registerMenuCommand('mostra mini clock', function(event) { div.style.opacity='1'; }, 'h');
      GM_registerMenuCommand('cambia posizione clock ↕', AtBottomClicked, 'b');
      GM_registerMenuCommand('cambio posizione left ◄', function(event) { div.style.margin='0px 33cm'; }, 'h');
      GM_registerMenuCommand('cambio posizione right ►', function(event) { div.style.margin='0px 0cm'; }, 'h');
      GM_registerMenuCommand('cambio posizione ha centro', function(event) { div.style.margin='0px 19cm'; }, 'h');
    }
  }
  init();
}


if(isFF) OnFullScreenChange(function(event) {
 try {
  if(!ref++)
    init();
  ref--;
 } catch(e) { console.log(e); }
});

function OnTimer() {
  var dt = new Date(), t = niceTime(dt);
  if(spn.textContent != t) {
    spn.textContent = t;
    if(!div.title || t.slice(-1)=='0')
      div.title = niceDate(dt);
  }
}


function shouldShow() {
  if(isTop) {
    var minWidth = getValue('miniClockMinWidth', 0);
    if(!minWidth || minWidth >= window.screen.availWidth || window.outerWidth >= minWidth)
      return true;
  } else
    return isFullScreen();
  return false;
}

function OnReSize() {
  try {
    clearInterval(hTimer);
    if(shouldShow()) {
      OnTimer();
      div.style.display = 'block';
      hTimer = setInterval(OnTimer, 1000);//ok
    } else {
      div.style.display = 'none';
      hTimer = 0;
    }
    if(wrapper)
      OnMouseMove();
  } catch(e) { console.log(e); }
}


function InsertClock(here) {
  if(div) {
    div.parentNode.removeChild(div);
    here.appendChild(div);
  }
}

function AtBottomClicked() {
  if(div.style.top == 'unset') {
    div.style.top = '';
    div.style.bottom = '';
    setValue('atbottom', false);
  } else {
    div.style.top = 'unset';
    div.style.bottom = '0px';
    setValue('atbottom', true);

  }
  div.blur();
}


function create() {
  div = obj('+DIV#us_MiniClock');
  spn = obj('+SPAN', div);
  if(getValue('atbottom')) {
    div.style.top = 'unset';
    div.style.bottom = '0px';
  }
  doc.body.appendChild(div);
  OnReSize();
  if(!doc.getElementById('us_MiniClockStyle')) {
    fontSize = getValue('fontsize', 14);
                                                    //margin max 33cm se ne va a right  margin:0px 19cm;al centro
addStyle('#us_MiniClock{position:fixed!important;top:0px;right:0px;width:auto;color:#E8E8E8;background-color:#181818;border:2px solid red;padding:1px 7px;font:' +
fontSize+'pt normal sans-serif;z-index:2147483647;}@media print{#us_MiniClock{display:none!important;}} \
#mcwrfsb{position:fixed;right:0px;bottom:0px;border:1px solid;height:25px;width:25px;}').id = 'us_MiniClockStyle';
    if(div.offsetLeft) {
      window.onresize = OnReSize;
      div.addEventListener("mouseenter", OnMouseEnter, false);
      if(isFF)
        MenuCreate(obj('+MENU#us_MiniClockMenu,type=context'));
    } else {
      clearInterval(hTimer);
      div.parentNode.removeChild(div);
      spn = div = null;
    }
  }
}



function init() {
  try {
    if(!div) {
      create();
      if(!div)
        return;
    }
    var fse = FullScreenElement() || doc.body, wrp, st;
    if(fse.contains(div))
      return;
    switch(fse.tagName) {
      case 'VIDEO':
        if(getValue('allowAtVideo')) {
          st = !fse.paused;
          EndFullScreenMode();
          wrp = fse.parentNode;
          if(wrp.id != 'miniClockWrapper') {
            wrapper = wrp = obj('+DIV#miniClockWrapper');
            obj('+DIV#mcwrfsb,=&nbsp;', wrp);
            wrp.firstChild.onclick = function(e) { if(!EndFullScreenMode()) SetFullScreenMode(wrapper); };
            wrp.appendChild(fse.parentNode.replaceChild(wrp, fse));
            wrp.addEventListener("mousemove", OnMouseMove);
          }
          if(isFullScreen())// why must it be asynchroniously?
            ForceEndFullscreen();
          SetFullScreenMode(wrp);
          InsertClock(wrp);
          if(st && fse.paused) {
            //console.log('video stopped while processed');
            fse.play();
          }
          window.setTimeout( function() {
            if(!isFullScreen())
              console.log('Clock could not reactivate full screen mode. Make sure, full-screen-api.allow-trusted-requests-only is false in about:config');
          }, 500);
        } else console.log('Clock not allowed in video tags. See https://greasyfork.org/de/scripts/11402-mini-clock for details.');
      case 'IFRAME':
        break;
      default:
        InsertClock(fse);
    }

  } catch(e){ console.log(e); }
}


         //esperimento solo data
var box = document.createElement("div");
box.setAttribute("style","bottom:px;top:0px;right:95px;margin:0px;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;\
color:White;border-radius:px;border:2px solid red ; font-family:sans-serif; font-size:12px; background-color:black; position:fixed; text-align:center; z-index:99999;");

document.body.appendChild(box);

function tick()
{
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
    var s = d.getSeconds();
    var D = d.getDate();//giorno settimana

   var DataAttuale = new Date();
  var Giorni = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"]
  var NumeroGiornoAttuale = DataAttuale.getDay();
  var GiornoAttuale = Giorni[NumeroGiornoAttuale];

    var Datamese = new Date();
  var Mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
  var NumeroMeseAttuale = DataAttuale.getMonth();
  var MeseAttuale = Mesi[NumeroMeseAttuale];
         //anno
var mydate=new Date()
var year=mydate.getYear()
if (year < 1000)
year+=1900
var day=mydate.getDay()
var month=mydate.getMonth()+1
if (month<10)
month="0"+month
var daym=mydate.getDate()
if (daym<10)


	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
	box.innerHTML =GiornoAttuale + " " +D + " "+MeseAttuale + " " +year
}

tick();
setInterval(tick, 1000);


