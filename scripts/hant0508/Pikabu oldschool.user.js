// ==UserScript==
// @name         Pikabu oldschool
// @namespace    http://tampermonkey.net/
// @version      0.5
// @author       hant0508
// @description  Возвращает Бровастика в футер Пикабу
// @include      http://pikabu.ru/*
// @include      https://pikabu.ru/*
// @grant        none
// ==/UserScript==

if(document.getElementById("brovdiv") !== null) {
  var brov = "http://cs.pikabu.ru/images/fun/chel.png";
  var elm = document.getElementById("brovdiv").children[0];
  elm.href = "http://pikabu.ru/profile/hant0508";
  if (elm.src !== undefined) elm.src = brov;
  else {
    elm.children[0].src = brov;
    elm.children[0].title = "Бровастик by hant0508";
}}