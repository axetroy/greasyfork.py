// ==UserScript==
// @author         перф (add ElMarado & CheckT)
// @collaborator   style: sw.East
// @namespace      https://greasyfork.org/ru/users/3065-чеширский-котъ

// @name           : HWM : Прочность Артефактов :
// @name:en        : HWM : arts hard : sm :
// @description    Текущая прочность артефактов + прогрессбар
// @description:en Current strength of artifacts + progress bar

// @run-at         document-end
// @icon           http://i.imgur.com/GScgZzY.jpg
// @version        1.53.m
// @encoding 	   utf-8

// @include        *://*.heroeswm.ru/home.php
// @include        *://*.heroeswm.ru/pl_info.php?*
// @include        *://*.heroeswm.ru/inventory.php*
// @include        *://*.heroeswm.ru/sklad_info.php?*
// @include        *://*.heroeswm.ru/arts_arenda.php
// @include        *://*.lordswm.com/home.php
// @include        *://*.lordswm.com/pl_info.php?*
// @include        *://*.lordswm.com/inventory.php*
// @include        *://*.lordswm.com/sklad_info.php?*
// @include        *://*.lordswm.com/arts_arenda.php
// @include        *://178.248.235.15/home.php
// @include        *://178.248.235.15/pl_info.php?*
// @include        *://178.248.235.15/inventory.php*
// @include        *://178.248.235.15/sklad_info.php?*
// @include        *://178.248.235.15/arts_arenda.php

// @compatible     chrome Chrome + TamperMonkey
// @compatible     firefox Firefox + TamperMonkey

// @copyright      2013-2019, sw.East (https://www.heroeswm.ru/pl_info.php?id=3541252)
// @license        MIT

// @grant          GM_addStyle
// ==/UserScript==


/** ==== Style === */
function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}

addStyleSheet("#slot1>div:nth-child(2)>div:nth-child(1)>div:nth-child(1)>a:nth-child(1)>img:nth-child(2){display:block;position:absolute;z-index:1;}");
addStyleSheet(".strength-bar-wrap{width:16px;height:16px;margin:0;position:absolute;background-color:#727272 !important;z-index:2;text-decoration:none !important;-webkit-box-shadow:1px 1px 1px 0 rgba(114,114,114,1);-moz-box-shadow:1px 1px 1px 0 rgba(114,114,114,1);box-shadow:1px 1px 1px 0 rgba(114,114,114,1);}");
addStyleSheet(".text_new_begin_wrap{width:16px;height:16px;margin:0;margin:-1px 0 0 -1px;position:absolute;background-color:#727272 !important;z-index:2;text-decoration:none !important;-webkit-box-shadow:1px 1px 1px 0 rgba(114,114,114,1);-moz-box-shadow:1px 1px 1px 0 rgba(114,114,114,1);box-shadow:1px 1px 1px 0 rgba(114,114,114,1);}");
addStyleSheet(".text_new_begin,.text_new_begin5{border:none;margin:1px 0 0 -1px;position:absolute;z-index:4;text-align:center;cursor:pointer;padding:1px;font-size:10px;text-decoration:none !important;height:16px;width:16px;-ms-transition:opacity .4s ease-in-out, visibility .4s ease-in-out;}");
addStyleSheet(".text_new_begin{color:#fff;}");
addStyleSheet(".text_new_begin5{background-color:#F00;height:15px;width:15px;color:#FFF;margin:0 auto !important;text-shadow:-1px 0 1px white, 1px 1px 3px black;opacity:16;}");
addStyleSheet(".progress-bar{height:16px;z-index:3;float:left;text-decoration:none !important;background-color:#8bc34a;-moz-box-shadow:inset 0 0 1px #ddd;opacity:.9;-moz-transition:all 1s ease;-moz-animation-duration:1s;-moz-animation-name:slidein;}");
/* Style End */

var url = location.href ;
var min_Strength = 2; //прочка начиная с которой подкрашиваем в красный цвет.
var item_hard_regexp = /: (\d+)\/(\d+)/;
var item_name_regexp = /uid=(\d+)/
var text_new_begin =  '<div class="text_new_begin">';
var strength_bar_wrap =  '<div class="strength-bar-wrap">';
var text_new_begin5 = '<div class="text_new_begin5">';
var text_new_end = '</div>';

if (url.indexOf('pl_info.php') >= 0)
	HardBySlot();

if(url.indexOf('home.php') >= 0)
	HardByInfo();

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
	}
	else {
		// FF3-, Chrome
		// HardByDocument();
		document.body.setAttribute('onload',
				' function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}; '+
				' var text_new_begin = \'<div class="text_new_begin>\';'+
                ' var strength_bar_wrap = \'<div class="strength-bar-wrap>\';'+
				' var text_new_end = \'</div>\'; '+
				' var item_hard_regexp = /: (\\d+)\\/(\\d+)/; '+
				' var dreses = getI( "//div[contains(@id, \'slot\')]" ); '+
				' for( var i = 0; i < dreses.snapshotLength; i++ ) { '+
				'		var dress = dreses.snapshotItem(i); '+
				'		var hard = item_hard_regexp.exec(dress.innerHTML); '+
				'		if(hard) '+
				'			dress.innerHTML = strength_bar_wrap + text_new_begin + String(hard[1]) + text_new_end + \'<div class="progress-bar" style="width:\'+ Math.round(hard[1] * 100 / hard[2]) +\'%">\' + text_new_end + text_new_end + dress.innerHTML; '+
				'	} '+
				'	for(var i = 0; i < arts_c; i++) { '+
				'		if(arts_fd_none[i]) { '+
				'                       if(arts_id[i]) {arts1[i]= \'<i style="font-size:10px">&nbsp;&nbsp;ID:\'+  arts_id[i] + \'</i>\' + arts1[i]};'+
				'			hard = item_hard_regexp.exec(arts_fd_none[i]); '+
				'			if(hard){ '+
				'				if(arts_fud[i]) { '+
				'					arts_fud[i]     = strength_bar_wrap + text_new_begin + String(hard[1]) + text_new_end + \'<div class="progress-bar" style="width:\'+ Math.round(hard[1] * 100 / hard[2]) +\'%">\' + text_new_end + text_new_end + arts_fud[i]; '+
				'				} '+
				'				if(arts_fd_ok[i]) { '+
				'					arts_fd_ok[i]   = strength_bar_wrap + text_new_begin + String(hard[1]) + text_new_end + \'<div class="progress-bar" style="width:\'+ Math.round(hard[1] * 100 / hard[2]) +\'%">\' + text_new_end + text_new_end + arts_fd_ok[i]; '+
				'				} '+
				'				if(arts_fd_none[i]) { '+
				'					arts_fd_none[i] = strength_bar_wrap + text_new_begin + String(hard[1]) + text_new_end + \'<div class="progress-bar" style="width:\'+ Math.round(hard[1] * 100 / hard[2]) +\'%">\' + text_new_end + text_new_end + arts_fd_none[i]; '+
				'				} '+
				'			} '+
				'		}	'+
				'	} '+
				'	show_c(); '+
				' ');
	}
}

function HardBySlot() {
	var dreses = getI( "//div[contains(@id, 'slot')]" );
	for( var i = 0; i < dreses.snapshotLength; i++ ) {
		var dress =  dreses.snapshotItem(i);
		hard = item_hard_regexp.exec(dress.innerHTML);
		if(hard)
			dress.innerHTML = hardHTML(hard) + dress.innerHTML;
	}
}

function HardByInfo() {
	var dreses = getI( "//a[contains(@href, 'art_info.php?id=')]" );
	var elo = '' ;
	for( var i = 0; i < dreses.snapshotLength; i++ ) {
		var dress =  dreses.snapshotItem(i);

		an = item_name_regexp.exec( dress.href ) ;
		if( an )
		{
			if( elo == an[1] )
				continue
			else
				elo = an[1]
		}
		hard = item_hard_regexp.exec(dress.parentNode.innerHTML);
		if(hard)
			dress.parentNode.innerHTML = hardHTML(hard) + dress.parentNode.innerHTML;
	}
}

function HardByJS() {
	for(var i = 0; i < arts_c; i++) {
		if(arts_fd_none[i]) {
			hard = item_hard_regexp.exec(arts_fd_none[i]);
//			alert (arts_id[i]);
                        if(arts_id[i]) {arts1[i]= '<i style="font-size:10px">&nbsp;&nbsp;ID:'+  arts_id[i] + '</i>' + arts1[i]};
			if(hard){
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
	alert(text);
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
		if(hard) {
			text = text.substring(0, pos_begin) + hardHTML(hard) + text.substring(pos_begin);
		}
		pos = pos_end + text_new_begin.length + text_new_end.length + 5;
	}
	document.documentElement.innerHTML = text;
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

function hardHTML(hard1){
	if ( hard1[1] > min_Strength)      { return strength_bar_wrap + text_new_begin  + String(hard1[1]) + text_new_end + '<div class="progress-bar" style="width:'+ Math.round(hard[1] * 100 / hard[2]) +'%">' + text_new_end + text_new_end; }
					else { return strength_bar_wrap + text_new_begin5 + String(hard1[1]) + text_new_end + '<div class="progress-bar" style="width:'+ Math.round(hard[1] * 100 / hard[2]) +'%">' + text_new_end + text_new_end; }
}// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();