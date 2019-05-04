// ==UserScript==
// @name         Steam auto key activator
// @description  Active steam Key
// @version      0.1
// @author       Zeper
// @match        https://store.steampowered.com/account/registerkey*
// @namespace https://greasyfork.org/users/191481
// ==/UserScript==
function register(){if(product_key.value.length>0){document.getElementsByName("accept_ssa")["0"].checked=true;RegisterProductKey();}}setInterval(register(), 100);
