// ==UserScript==
// @name        qaru.site unlooker
// @namespace   *qaru.site*
// @match        http://qaru.site/*
// @match     	 https://qaru.site/*
// @description  Разворачиваем текст
// @author       WayOnG
// @version     1.0
// @grant       none
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('#answers').find('script').remove();

var classname = $('.answer-row > div:first').attr( "class" );
$('.'+classname).removeClass(classname);

