// ==UserScript==
// @name         CS.RIN.RU - Google Blacklist Fix
// @namespace    Royalgamer06
// @version      0.2
// @description  Redirects to working page
// @author       Royalgamer06
// @include      *://cs.rin.ru/forum/viewtopic.php?f=*&t=*
// @grant        none
// @run-at       document-start 
// ==/UserScript==

location.href = location.href.split('?f=')[0] + '?t=' + location.href.split('&t=')[1];