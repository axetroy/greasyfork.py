// ==UserScript==
// @name Spasibo Abu
// @include *2ch.hk*
// @description Возвращает список досок на законное место. Спасибо, Абу!
// @grant none
// @version 111!
// @namespace kokoko
// ==/UserScript==

document.querySelector('header').insertBefore(document.querySelector('#boardNavBottom').cloneNode(true), document.querySelector('header div.logo'));