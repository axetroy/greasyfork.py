// ==UserScript==
// @name        DailyMail right pane remover
// @namespace   tag://kwhitefoot@hotmail.com
// @description Remove the "Don't miss" column from the right of the Daily Mail.
// @include     http://www.dailymail.co.uk/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @license     GPL3
// @compatible  firefox 
// @supportURL  kwhitefoot@hotmail.com
// ==/UserScript==

/*

Adapted from http://userscripts-mirror.org/scripts/show/177214

Original namespace: http://tilman.baumann.name/femaleremover

The original didn't work because of a typo (requir instead of require)
and because the include url for jquery was wrong.

I have added several classes to be removed.  Not sure they are all
necessary.

Kevin Whitefoot, 2015-04-19.
*/

window.$(document).ready(function () {
  window.$('.beta').remove();
  window.$('femail item').remove();
  window.$('link-bogr2').remove();
  window.$('linkro-wocc').remove();
});
