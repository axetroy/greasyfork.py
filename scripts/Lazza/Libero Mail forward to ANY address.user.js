// ==UserScript==
// @name       Libero Mail forward to ANY address
// @namespace  http://andrealazzarotto.com/
// @version    1.1
// @description  Removes the limitation to forward to @libero.it addresses on the webmail GUI of this provider
// @include      http://*.libero.it/*Filtri*
// @copyright  2014+, Andrea Lazzarotto
// ==/UserScript==

unsafeWindow.checkAllowedDomain = function() { return true; }