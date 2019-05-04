// ==UserScript==
// @name        Gizmodo Brasil remove image
// @namespace   http://github.com/tcelestino
// @include     http://gizmodo.uol.com.br/*
// @description remove image to header post pages
// @version     1
// @grant       none
// ==/UserScript==

var header = document.querySelector('.destaque-titulo');
var image_header = document.querySelector('.img');

if (header) {
  header.removeChild(image_header);
}