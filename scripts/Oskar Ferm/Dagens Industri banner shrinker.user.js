// ==UserScript==
// @name        Dagens Industri banner shrinker
// @namespace   di.se
// @description Resizes the giant banner to a more respectable size
// @include     http://www.di.se/*
// @version     1.1
// @grant       none
// ==/UserScript==
var framesetTop = document.querySelector('html > frameset');
framesetTop.rows = '0,55,*';
