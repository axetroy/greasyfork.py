// ==UserScript==
// @name         file4go.net
// @namespace    http://file4go.net
// @version      1.1
// @description  Remove o tempo de espera
// @author       MiX
// @license      MIT
// @include      http*://*file4go.net*
// @run-at document-end
// ==/UserScript==

unsafeWindow.time = 0;