// ==UserScript==
// @name         Identi.li
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Muestra los links de identi.li
// @author       You
// @homepageURL    http://www.identi.li/
// @include        http://*.identi.li/topic/*
// @include        http://*.identi.li/index.php?topic=*
// @icon           http://i.imgbox.com/R0R84xlm.png
// @grant        none
// ==/UserScript==

   javascript:document.write(GibberishAES.dec($('.info_bbc').html(),_decrypt.hash));