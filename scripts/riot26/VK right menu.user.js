// ==UserScript==
// @name        VK right menu
// @description Move VK menu to right
// @namespace   riot26.ru
// @include     https://vk.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

var side_bar = document.getElementById('side_bar');
var page_body = document.getElementById('page_body');
side_bar.classList.remove('fl_l');
side_bar.classList.add('fl_r');
page_body.classList.remove('fl_r');
page_body.classList.add('fl_l');