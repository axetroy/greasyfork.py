// ==UserScript==

// @date	2017-05-20

// @name	HWM:horoscope
// @description Поиск красных букв
// @version	1.0
// @author	kuzya

// @include	http://daily.heroeswm.ru/n/advice*
// @namespace https://greasyfork.org/users/126505
// ==/UserScript==
var j = 0;
var by = [];
var forms = document.getElementById('Monday');
var inps = forms.getElementsByTagName('font');
for( var i = 0; i < inps.length; i++) {
var inp = inps[i];
by[i+j]=inps[i].innerHTML;}
j = j+i;
var forms = document.getElementById('Tuesday');
var inps = forms.getElementsByTagName('font');
for( var i = 0; i < inps.length; i++){
var inp = inps[i];
by[i+j]=inps[i].innerHTML;}
j = j+i;
var forms = document.getElementById('Wednesday');
var inps = forms.getElementsByTagName('font');
for( var i = 0; i < inps.length; i++){
var inp = inps[i];
by[i+j]=inps[i].innerHTML;}
j = j+i;
var forms = document.getElementById('Thursday');
var inps = forms.getElementsByTagName('font');
for( var i = 0; i < inps.length; i++){
var inp = inps[i];
by[i+j]=inps[i].innerHTML;}
j = j+i;
var forms = document.getElementById('Friday');
var inps = forms.getElementsByTagName('font');
for( var i = 0; i < inps.length; i++){
var inp = inps[i];
by[i+j]=inps[i].innerHTML;}
j = j+i;
var forms = document.getElementById('Saturday');
var inps = forms.getElementsByTagName('font');
for( var i = 0; i < inps.length; i++){
var inp = inps[i];
by[i+j]=inps[i].innerHTML;}
j = j+i;
var forms = document.getElementById('Sunday');
var inps = forms.getElementsByTagName('font');
for( var i = 0; i < inps.length; i++){
var inp = inps[i];
by[i+j]=inps[i].innerHTML;}
var str = by.join('');
j = j+i;
alert("Красные буквы — "+str);