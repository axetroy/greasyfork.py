// ==UserScript==
// @name		모바일 타이틀 제거 S
// @version 		1.0
// @author		리드(http://www.suyongso.com)
// @include		https://www.suyongso.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @description		수용소 모바일 상단 타이틀 제거
// @grant		none
// @namespace https://greasyfork.org/users/226807
// ==/UserScript==

$('header[class=main]').children().first().hide();

var titleHeader = document.getElementsByClassName("top-title")[0];
titleHeader.parentNode.removeChild(titleHeader);
//$('h2[class=top-title]').hide();
//alert(titleHeader.length);