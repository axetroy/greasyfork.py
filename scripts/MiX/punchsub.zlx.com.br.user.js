// ==UserScript==
// @name         punchsub.zlx.com.br
// @namespace    www.imasters.com
// @version      1.5
// @description  Remove o tempo de espera de 10 segundos do site punchsub.zlx.com.br
// @author       Black
// @license      MIT
// @include      https*://*punchsub.zlx.com.br*
// @include       http*://*fileproject-ps.zlx.com.br*
// @run-at document-end
// ==/UserScript==
$(document).ready(function () {
countdown(1);
});