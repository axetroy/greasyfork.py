// ==UserScript==
// @name         BT之家宽屏+去广告
// @namespace    beautyears
// @version      0.0.2
// @description  BT之家宽屏显示+去广告
// @author       beautyears
// @match        *://www.btbtt.net/*
// @match        *://www.btbtt.co/*
// @match        *://www.btbtt.me/*
// @match        *://www.btbtt.pw/*
// @match        *://www.btbtt.la/*
// @grant        none
// ==/UserScript==
var bttmp=null;
$('body').css('background','none');
for(var i=0;i<100;i++){
  bttmp=$('body *')[0];
  if(bttmp.id=='wrapper1')
    break;
  $(bttmp).remove();
}
$('.width').css({'max-width':'90%','width':'90%'});