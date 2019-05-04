// ==UserScript==
// @name Smart Outlook.com
// @name:ja Smart Outlook.com
// @namespace https://userstyles.org/users/141733
// @description With this style , you can effectively use more space in the mail page of Outlook.com.
// @description:ja このスタイルを使うと、Outlook.comのメールページでより多くのスペースを有効活用できます。
// @author noritaro
// @include https://*.live.com/*
// @grant none
// @version 0.0.6
// @license http://creativecommons.org/licenses/by-nc-sa/4.0/
// ==/UserScript==

// https://userstyles.org/styles/112145/smart-outlook-com
// https://greasyfork.org/ja/scripts/9981-smart-outlook-com
// This style was created based on the Outlook.com Tidy by BoffinbraiN.

var s = document.createElement('style');
s.type = 'text/css';
var t =
	'/* Hide right panel and footer */\n'+
	'#RightRailContainer {display:none !important;}\n'+
	'.FooterContainer {height:0 !important;}\n'+
	'#MainContent {right:0 !important; bottom:0 !important;}\n'+
	'\n'+
	'/* Compact Inbox */\n'+
	'.InboxTableBody > li {height:auto !important; font-size:90% !important;}\n'+
	'.InboxTableBody > li > * {height:auto !important; padding-top:1px !important;}\n'+
	'.InboxTableBody .Ck {position:relative !important; top:1px !important;}\n'+
	'.InboxTableBody .Fm img {margin-top:1px !important;}\n'+
	'\n'+
	'/* Compact Folder Lists */\n'+
	'ul.LeftNav > li > * {min-height:0 !important;}\n'+
	'ul.LeftNav > li > * > span {line-height:1.3em !important; top:-2px !important;}\n'+
	'\n'+
	'/* Hide right panel and footer (2015) */\n'+
	'.ContentRight {right:0 !important; bottom:0 !important;}\n'+
	'.c-PageFooter {height:0 !important;}\n'+
	'.ContentRightInner {bottom:0 !important;}\n'+
	'\n'+
	'/* Compact Folder Lists (2015) */\n'+
	'ul.indentedleftnavlist > li > * {min-height:0 !important;}\n'+
	'ul.indentedleftnavlist > li > * > span {line-height:1.3em !important; top:-2px !important; font-size:90% !important;}\n'+
	'\n'+
	'/* Adjust the order of overlapping (2015) */\n'+
	'div.rmTop.t_mbgc  {z-index:1 !important;}\n'+
	'ul.c_m {z-index:2 !important;}\n'+
	'\n'+
	'/* Hide right panel (2016) */\n'+
	'div._n_h {width:0 !important;}\n'+
	'div#primaryContainer > div {right:0 !important;}\n'+
	'\n'+
	'/* Compact Inbox (2016) */\n'+
	'._lvv_11 ._lvv_t {height:72px !important;}\n'+
	'._lvv_11 ._lvv_x {height:71px !important;}\n'+
	'\n'+
	'/* Hide right panel (2017 beta) */\n'+
	'div#app>div>div:nth-of-type(2)>div>div:nth-of-type(1)>div:nth-of-type(4) {width:0 !important;}\n'+
	'';
t = document.createTextNode(t);
s.appendChild(t);
var head = document.getElementsByTagName('head');
head = head[0];
head.appendChild(s);