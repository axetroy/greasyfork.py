// ==UserScript==
// @name               Sticky itens hider (medium.com, hackernoon)
// @description        Hides medium.com and hackernoon.comfooter, header and sidebar
// @version            1.1
// @include            https://medium.com/*
// @include            https://hackernoon.com*
// @namespace https://greasyfork.org/users/153157
// ==/UserScript==

const fixedItens = document.getElementsByClassName('u-fixed');
for (let i = 0; i < fixedItens.length; i++) {
  fixedItens[i].style.display = 'none';
}