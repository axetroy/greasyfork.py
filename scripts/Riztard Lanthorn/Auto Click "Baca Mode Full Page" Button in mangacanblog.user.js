// ==UserScript==
// @name         Auto Click "Baca Mode Full Page" Button in mangacanblog
// @namespace    Auto Click "Baca Mode Full Page" Button in mangacanblog
// @version      1.3
// @description  Auto Click "Baca Mode Full Page" Button in mangacanblog.com
// @author       Riztard
// @match        mangacanblog.com*
// @include      mangacanblog.com*
// @exclude      mangacanblog.com/baca-komik*terbaru.html
// @grant        none
// ==/UserScript==

'use strict';

window.location.href = $('.pager>.pagers>a').attr('href');