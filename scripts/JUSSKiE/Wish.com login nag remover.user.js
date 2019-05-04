// ==UserScript==
// @name         Wish.com login nag remover
// @namespace    https://greasyfork.org/en/users/215602
// @version      0.1
// @description  Just removes the Wish.com login popup nag
// @author       You
// @match        *://www.wish.com/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
$('.sc-188teto-0-BaseModal__PlainBackDrop-dRLQsm').remove();