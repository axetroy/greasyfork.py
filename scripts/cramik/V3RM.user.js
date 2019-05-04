// ==UserScript==
// @name           V3RM
// @namespace      Cramik
// @description    YOLO
// @version        1.0
// @include        http://www.v3rmillion.net/*
// @include        *v3rmillion.net/
// @include        http://www.v3rmillion.net/
// @include        *v3rmillion.net/*
// @include        http://www.v3rmillion.net/
// ==/UserScript==

var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
   if(theImages[i].src.indexOf('Logo-1.png') != -1) theImages[i].src = 'http://i.imgur.com/obrEHC2.png';
}